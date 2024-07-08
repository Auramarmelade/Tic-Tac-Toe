import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Composant fonctionnel Square qui représente un carré dans le jeu
function Square(props) {
  return (
    // Bouton représentant un carré avec une valeur et un gestionnaire d'événements onClick
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// Composant de classe Board qui représente le plateau de jeu
class Board extends React.Component {
  constructor(props) {
    super(props);
    // Initialisation de l'état local du plateau de jeu
    this.state = {
      squares: Array(9).fill(null), // Tableau de 9 éléments représentant les carrés du jeu
      xIsNext: true, // Indique quel joueur doit jouer ensuite
    };
  }

  // Gestionnaire d'événements pour gérer le clic sur un carré du plateau
  handleClick(i) {
    const squares = this.state.squares.slice(); // Création d'une copie du tableau de carrés
    // Vérification si quelqu'un a gagné ou si le carré est déjà rempli
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Mise à jour du tableau de carrés avec la nouvelle valeur (X ou O)
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // Mise à jour de l'état local du plateau de jeu pour indiquer le prochain joueur
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  // Méthode pour rendre un carré avec une valeur spécifique et un gestionnaire d'événements onClick
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]} // Valeur du carré (X, O ou null)
        onClick={() => this.handleClick(i)} // Gestionnaire d'événements pour gérer le clic sur le carré
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares); // Vérification s'il y a un gagnant
    let status;
    // Affichage du statut du jeu en fonction du gagnant ou du prochain joueur
    if(winner) {
      status = winner + ' a gagné ';
    } else {
      status = 'Prochain joueur : ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      // Structure du plateau de jeu
      <div>
        {/* Affichage du statut */}
        <div className="status">{status}</div>
        {/* Première ligne du plateau */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        {/* Deuxième ligne du plateau */}
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        {/* Troisième ligne du plateau */}
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// Composant de classe Game qui représente le jeu global
class Game extends React.Component {
  render() {
    return (
      // Structure du jeu
      <div className="game">
        {/* Division pour le plateau de jeu */}
        <div className="game-board">
          <Board /> {/* Affichage du plateau de jeu */}
        </div>
        {/* Division pour les informations du jeu */}
        <div className="game-info">
          <div>{/* status */}</div> {/* Affichage du statut du jeu */}
          <ol>{/* TODO */}</ol> {/* Liste des mouvements */}
        </div>
      </div>
    );
  }
}

// Fonction utilitaire pour vérifier s'il y a un gagnant
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Vérification si les valeurs des carrés forment une ligne gagnante
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Retourne la valeur du carré qui forme la ligne gagnante
    }
  }
  return null; // Retourne null s'il n'y a pas de gagnant
}

// Rendu du composant Game dans la racine de l'application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);