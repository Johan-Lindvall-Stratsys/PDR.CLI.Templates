const fs = require('fs')
const path = require('path')

const pdrConfigPath = path.join(process.cwd(), '.pdrconfig')
const pdrConfig = JSON.parse(fs.readFileSync(pdrConfigPath, 'utf8'))
const auditConfig = pdrConfig.audit

const severities = ["low", "moderate", "high", "critical"]
const severity = {}
severities.forEach((x, i) => severity[severity[x] = i] = x)

const projects = ["root", "frontend", "server"]
const vulnerabilitites = projects.map(x => processAuditLog(x))
  .reduce((acc, x) => acc.concat(x), [])
  .map(x => Object.assign(x, {
    severity: severity[x.severity]
  }))


if (vulnerabilitites.length) {
  console.log(`##vso[task.logissue type=warning;]Found ${vulnerabilitites.length} vulnerabilities.`)
  console.log(`Looks like we have
some bad milk here!
       \\
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`)
  console.log(JSON.stringify(vulnerabilitites, null, 2))
  let exitCode = 0
  vulnerabilitites.forEach(vulnerability => {
    if (vulnerability.severity === severity['critical']) {
      exitCode++
      console.log(`##vso[task.logissue type=error;sourcepath=${vulnerability.location};]Critical error in "${vulnerability.package}" found during audit! See log for details.`)
    } else {
      console.log(`##vso[task.logissue type=warning;sourcepath=${vulnerability.location};]Security found in "${vulnerability.package}" during audit. See log for details.`)
    }
  })

  console.log('To suppress these messages add them to the "audit.acceptedRisks" in .pdrconfig.')

  process.exit(exitCode)
}
const locations = {
  root: '/package.json',
  frontend: '/frontend/package.json',
  server: '/server/package.json'
}

function processAuditLog(project) {
  const locations = {
    root: '/package.json',
    frontend: '/frontend/package.json',
    server: '/server/package.json'
  }

  const auditFolder = path.join(process.cwd(), './audits')
  const mainAuditPath = path.join(auditFolder, `${project}.audit`)
  const auditFile = fs.readFileSync(mainAuditPath, 'utf8')

  return auditFile
    .split(/\r?\n/)
    .filter(x => !!x)
    .map(x => JSON.parse(x))
    .map(x => {
      const package = x.data.advisory.module_name
      const entry = {
        package,
        location: locations[project],
        cwe: x.data.advisory.cwe,
        path: x.data.resolution.path,
        vulnerable_versions: x.data.advisory.vulnerable_versions,
        patched_versions: x.data.advisory.patched_versions,
        current_version: x.data.advisory.findings[0].version,
        severity: severity[x.data.advisory.severity]
      }
      return entry
    })
    .filter(x => {
      const unkownRisk = auditConfig.acceptedRisks.indexOf(x.package) === -1
      const aboveThreshhold = x.severity >= severity[auditConfig.severity]
      return unkownRisk && aboveThreshhold
    })
}

