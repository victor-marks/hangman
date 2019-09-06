import React, { Component } from 'react';
import './Hangman.css';
import gallows from './0.jpg';
import head from './1.jpg';
import torso from './2.jpg';
import rightArm from './3.jpg';
import leftArm from './4.jpg';
import rightLeg from './5.jpg';
import leftLeg from './6.jpg';
import { randomWord } from './words';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [gallows, head, torso, rightArm, leftArm, rightLeg, leftLeg]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    console.log('answer: ', this.state.answer);
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split('')
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  restart() {
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
  }

  /** render: render game */
  render() {
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt="{this.state.nWrong}/6"
        />
        <button id="Hangman-restart" onClick={this.restart}>
          Restart!
        </button>
        <p>Number wrong: {this.state.nWrong}</p>
        <p className="Hangman-word">{this.guessedWord()}</p>
        {this.state.nWrong === this.props.maxWrong ? (
          <p>You lose! The answer was '{this.state.answer}'</p>
        ) : (
          <p className="Hangman-btns">{this.generateButtons()}</p>
        )}
      </div>
    );
  }
}

export default Hangman;
