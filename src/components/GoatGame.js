import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Typography, Button } from '@material-ui/core'

const CLIMB_RATE = 600
const GOAL_HEIGHT = 6000

const style = {
    constainerStyle: {
        padding: '10px',
    },
    item: {
        textAlign: 'center',
    },
    goatText: {
        textAlign: 'center',
        margin: '2em',
    }
}

const goatAttacc = (rate, action) => {
    if (Math.random() <= rate) {
        action()
    }
}

const startState = {
    health: 100,
    food: 69,
    height: 0,
    message: 'goat game!!!'
}

export default class GoatGame extends Component {
    state = {
        ...startState
    }

    componentDidUpdate() {
        if (this.state.height < 0) {
            this.setState({
                ...this.state,
                height: 0,
            })
        }
        
        if (this.state.health <= 0) {
            alert('you lose bitch!!')
            this.setState(startState)
        }

        if (this.state.height >= GOAL_HEIGHT) {
            alert('you win bitch!!!')
            this.setState(startState)
        }
    }

    climb = () => {
        let newState = {
            height: this.state.height + CLIMB_RATE,
            health: this.state.health - 10,
            message: 'climbing!!',
        }

        goatAttacc(0.3, () => {
            newState.height = this.state.height - 1100
            newState.message = 'you were attacced by the goat!'
        })

        this.setState({
            ...this.state,
            ...newState,
        })
    }

    rest = () => {
        let newState = {}

        if (this.state.health >= 60) {
            newState.message='You cannot rest past 60 health'
        } else {
            newState.health = this.state.health + 11
            newState.message = 'you healed from resting'

            goatAttacc(0.6, () => {
                newState.health = this.state.health - 10
                newState.message = 'you were attacked by the goat while resting!'
            })
        }

        this.setState({
            ...this.state,
            ...newState
        })
    }

    eat = () => {
        const healthGain = 5

        if (this.state.food > 0 && this.state.health < 100) {
            this.setState({
                ...this.state,
                health: this.state.health + healthGain,
                food: this.state.food - healthGain,
                message: 'you ate food!',
            })
        }
    }

    render() {
        return (
            <div>
                <Grid container spacing={2} style={style.constainerStyle} justify='center'>
                    <Grid item xs={4} style={style.item}>
                        <Typography>
                            Health: {this.state.health}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} style={style.item}>
                        <Typography>
                            Height: {this.state.height}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} style={style.item}>
                        <Typography>
                            Food: {this.state.food}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={99} style={style.constainerStyle}>
                    <Grid item xs={4} style={style.item}>
                        <Button variant='contained' onClick={this.climb}>
                            Climb
                        </Button>
                    </Grid>
                    <Grid item xs={4} style={style.item}>
                        <Button variant='contained' onClick={this.rest}>
                            Rest
                        </Button>
                    </Grid>
                    <Grid item xs={4} style={style.item}>
                        <Button variant='contained' onClick={this.eat}>
                            Eat
                        </Button>
                    </Grid>
                </Grid>
                <Typography style={style.goatText}>
                    {this.state.message}
                </Typography>
            </div>
        )
    }
}
