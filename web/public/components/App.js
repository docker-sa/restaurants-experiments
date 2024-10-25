import { html, render, Component } from '../js/preact-htm.js'
import Header  from './Header.js'
import Main  from './Main.js'
import Footer  from './Footer.js'

class App extends Component {
  render() {
    return html`

      <div>
        <header class="container">
          <section>
            <${Header}/>
          </section>
        </header>

        <main class="container">
          <section>
            <${Main}/>
          </section>
        </main>

        <footer class="container">
          <section>
            <${Footer}/>
          </section>
        </footer>
      </div>
    `
  }
}

export default App


