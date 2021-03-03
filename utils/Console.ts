import  colors = require('colors')
import * as loader from 'cli-progress'

export enum Type {
    success = 'success', // Green color
    info = 'info', // Cyan color
    warn = 'warn', // Yellow color
    error = 'error', // Red color
    data = 'data', // White color
}

export default class Console {

    public _name: string

    constructor(name?: string) {
        this._name = '['+ colors.cyan('server@') + colors.magenta((name || 'api')) +']'
    }

    private colorContent(type: Type, content: string) {
        let arrContent = content.split(' ')
        
        for(let i = 0; i < arrContent.length; i++) {
            let word = arrContent[i]
            
            // For URL color white
            if(word.includes('http') || word.includes('www')) arrContent[i] = colors.gray(word)
            else {
                if(type == 'success') arrContent[i] = colors.green(word)
                if(type == 'info') arrContent[i] = colors.cyan(word)
                if(type == 'warn') arrContent[i] = colors.yellow(word)
                if(type == 'error') arrContent[i] = colors.red(word)
                if(type == 'data') arrContent[i] = colors.white(word)    
            }
        
        }

        let text = arrContent.join(' ')

        return text
    }

    public log(type: Type, content: string) {
        console.log(this._name, this.colorContent(type, content))
    }

    public startLoader(type:Type, content: string, func?: Function) {

        // console.log(func)
        this.log(type, content)

        let bar = new loader.Bar({
            format: this._name +' |'+ colors.cyan('{bar}') +'| {percentage}% || {value}/{total} Tasks',
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true
        })

        // 20 number tasks
        bar.start(20, 0, {
            speed: "N/A"
        })

        var value = 0

        var speedData = [];

        var timer = setInterval(function(){
            value++

            speedData.push(Math.random()*2+5)
            var currentSpeedData = speedData.splice(-10)

            bar.update(value, {
                speed: (currentSpeedData.reduce(function(a, b) { return a + b; }, 0) / currentSpeedData.length).toFixed(2) + "Mb/s"
            });

            if (value >= bar.getTotal()){
                clearInterval(timer)

                bar.stop()
            }
        }, 20)
    }
}