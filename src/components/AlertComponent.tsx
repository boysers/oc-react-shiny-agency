import { Component } from 'react'

export class AlertComponent extends Component {
  displayAlert() {
    alert(`L'alerte a été déclenchée`)
  }

  render() {
    return (
      <div>
        <button onClick={() => this.displayAlert()}>👉 Cliquer ici 👈</button>
      </div>
    )
  }
}
