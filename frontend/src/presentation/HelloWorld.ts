import '../layout/hello-world.less'
import image from '../assets/img.png'
import loremIpsum from '../assets/lorem-ipsum.json'

export default class HelloWorld {
  private heading!: HTMLHeadingElement
  private container: HTMLDivElement
  private button!: HTMLButtonElement

  public constructor(message: string, actionText: string) {
    this.container = document.createElement('div')
    this.container.classList.add('example-page')
    this.createHeading(this.container, message)
    this.createButton(this.container, actionText)
    this.createContent(this.container)
  }

  public attach($parent: HTMLElement): void {
    $parent.appendChild(this.container)
  }

  public updateHeading(message: string): void {
    this.heading.innerText = message
  }

  public removeEventListeners(): void {
    this.button.removeEventListener('click', this.handleButtonClick)
  }

  private createButton($container: HTMLElement, actionText: string): void {
    this.button = document.createElement('button')
    this.button.innerText = actionText
    this.button.addEventListener('click', this.handleButtonClick)
    $container.appendChild(this.button)
  }

  private createContent($container: HTMLElement): void {
    const content = document.createElement('div')
    content.classList.add('sem-visual', 'sem-indent', 'sem-separate', 'image-container')
    const span = document.createElement('span')
    span.innerText =
      'This is your newly created PDR application with a lazy loaded element! You can load all your assets through import statements. Like this image:'
    span.classList.add('sem-prio-high-1')
    span.style.display = 'block'

    const img = document.createElement('img')
    img.src = image
    content.appendChild(span)
    content.appendChild(img)
    $container.appendChild(content)

    for (let i = 1; i <= 15; i++) {
      let div = document.createElement('div')
      div.classList.add('sem-visual', 'sem-indent', 'sem-separate', 'lorem-ipsum')
      let p = document.createElement('p')
      p.classList.add('lorem-ipsum-text')
      p.innerText = loremIpsum['loremIpsum' + i]
      div.appendChild(p)
      $container.appendChild(div)
    }
  }

  private createHeading($container: HTMLElement, message: string): void {
    this.heading = document.createElement('h1')
    this.heading.innerText = message
    $container.appendChild(this.heading)
  }

  private handleButtonClick(): void {
    alert('Hi!')
  }
}
