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

async function info(apiURL) {
    try {
      const response = await fetch(apiURL+"/api/info", {
          method: "GET"
        })
      const data = await response.text()
      console.log("📦", data)
      return data
  
    } catch (error) {
      console.log("😡", error) 
      return error
    }
}

let apiURL = await getAPIURL()
let infoMessage = await info(apiURL)


class Footer extends Component {
    constructor(props) {
        super()
        this.state = { 
            infoMessage: infoMessage,
        }
    }

    render() {
        return html`
        <hr></hr>
        <p>${this.state.infoMessage}</p>
        `
      }

}

export default Footer