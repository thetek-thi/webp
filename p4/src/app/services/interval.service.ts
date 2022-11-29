import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class IntervalService {
  private ids = new Map<string, any>() // map for component name -> interval id
  private intervalTime = 2000 // period in seconds

  constructor() {
    console.log('*** interval service created ***')
  }

  setInterval(componentName: string, lambda: () => void): void {
    if (!this.ids.has(componentName)) {
      // start interval with lambda, repeat every <intervalTime> ms
      // remember interval id for clearIntervals()
      lambda()
      const intervalId = setInterval(lambda, this.intervalTime)
      this.ids.set(componentName, intervalId)
      console.log(`${componentName} component: activating interval id = ${JSON.stringify(intervalId)}`)
    }
  }

  clearIntervals(): void {
    for (let componentName of this.ids.keys()) {
      const intervalId = this.ids.get(componentName)
      console.log(`${componentName} component: removing interval id = ${JSON.stringify(intervalId)}`)
      clearInterval(intervalId)
    }
    this.ids = new Map<string, any>()
  }
}
