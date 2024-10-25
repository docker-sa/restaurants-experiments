import { html, render, Component } from '../js/preact-htm.js'

async function getAPIURL() {
  try {
      const response = await fetch("/api/url", {
          method: "GET"
        })
      const data = await response.json()
      console.log("📦", data)
      return data.url
  
    } catch (error) {
      console.log("😡", error) 
      return error
    }
}

async function getVariables(apiURL) {
  try {
    const response = await fetch(apiURL+"/api/variables", {
        method: "GET"
      })
    const data = await response.json()
    console.log("📦", data)
    return data

  } catch (error) {
    console.log("😡", error) 
    return error
  }

}

let apiURL = await getAPIURL()
let variables = await getVariables(apiURL)

class Header extends Component {

  constructor(props) {
    super()

    console.log("🚧", variables)

    this.state = { 
      message: variables.message ? variables.message : "",
      appName: variables.appName ? variables.appName : "",
      mainTitle: variables.mainTitle,
    }
  }

  render() {
    return html`
    <h1>${this.state.mainTitle}</h1>
    <h2>${this.state.message}</h2>
    <h3>🤖Application name: ${this.state.appName}</h3>
    <hr></hr>
    `
  }
}

export default Header
