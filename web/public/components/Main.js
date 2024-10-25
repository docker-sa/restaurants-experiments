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

async function getRestaurants(apiURL) {
    try {
        const response = await fetch(apiURL+"/api/restaurants", {
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
let restaurants = await getRestaurants(apiURL)


class Main extends Component {
    constructor(props) {
        super()
        //const headers = Object.keys(restaurants[0]);
        //console.log(headers)

        this.state = {
            headers: Object.keys(restaurants[0]),
            restaurants: restaurants
        }

    }

    /*
    <thead>
        <tr>
            ${this.state.headers.map(header => {
                return html`<th scope="col">${header}</th>`
            })}
        </tr>
    </thead>

    */


    render() {
        return html`
        <table>
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Tags</th>
                </tr>
            </thead>
            <tbody>
                ${this.state.restaurants.map(restaurant => {
                    return html`
                    <tr>
                        <th>${restaurant.id}</th>
                        <td>${restaurant.name}</td>
                        <td>${restaurant.tags}</td>
                    </tr>
                    `
                })}
 
            </tbody>
        </table>
        `
      }

}

export default Main