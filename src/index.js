
import ReactDOM from 'react-dom/client';
import './index.css';

import React, { useState, useEffect } from 'react';

// class Square extends React.Component {
//     render() {
//       return (
//         <button 
//         className="square" 
//         onClick={() => this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
//   } REPLACE THIS W/FOLLOWING SQUARE FUNCTION component:

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {

  // handleClick(i) {
  //   const history = this.state.history;
  //   const current = history[history.length - 1];
  //   const squares = current.squares.slice()
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     history: history.concat([{squares: squares,}]),
  //     xIsNext: !this.state.xIsNext,
  // });
  // }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // const status = 'Next player: X'; - 1.0 v
    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); - 2.0 v

    // const winner = calculateWinner(this.state.squares);
    //   let status;
    //   if (winner) {
    //     status = 'Winner: ' + winner;
    //   } else {
    //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    //   }

    return (
      <div>
        <div className="status">{/* status*/}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ squares: squares, }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Game />);


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

// root.render(<Clock />);


class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}



function UserGreeting(props) {
  return <h1>Welcome back!</h1>
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (
    <button onClick={props.myFunction}>
      Login
    </button>
  )
}

function LogoutButton(props) {
  return (
    <button onClick={props.onLogoutClick}>
      Logout
    </button>
  )
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick = () => {
    this.setState({ isLoggedIn: true })
  }

  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onLogoutClick={this.handleLogoutClick} />

      const props = {
        onLogoutClick: this.handleLogoutClick
      }

      LogoutButton(props)
    } else {
      button = <LoginButton myFunction={this.handleLoginClick} />;


      // button = LoginButton({ onClick: this.handleLoginClick })
    }

    // const ToggleClass = new Toggle()

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
        {/* {LoginButton({ onClick: this.handleLoginClick })} */}
        {/* {ToggleClass.render()} */}
        {/* <Toggle /> */}
        The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
      </div>
    )
  }
}





class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value, //??????
    })
  }

  render() {
    return (
      <div>
        <input onChange={this.handleNameChange} placeholder="Enter Your Name Here" />
        <p>{this.state.name}</p>
      </div>
    )
  }
}



function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  )
}

const messages = ['React', 'Re: reafd', 'fedacttt'];

function ExampleFalse() {
  const count = 0; // *** 0 === FALSE ***
  return (
    <div>
      {count && <h1>Messages: {count}</h1>}
      {/* when {count} is false, <h1> is not executed but {count} is getting rendered */}
    </div>
  )
}




function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  )
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({ showWarning: !state.showWarning }))
  }

  // loadText = () => 'hi'
  // loadTextFn() { return 'hi' }

  render() {
    // console.log(this.loadText)
    // console.log(this.loadText())
    // console.log(this.loadTextFn)
    // console.log(this.loadTextFn())
    // console.log(() => {})

    // const favNum = () => 4

    // const result = Math.max()

    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        {/* <button>{this.loadText}</button>
        <button>{this.loadTextFn}</button> */}
        <button onClick={this.handleToggleClick}>{this.state.showWarning ? 'Hide' : 'Show'}</button>
      </div>
    )
  }
}

// -------------------------------------
//   root.render(
//     <>
//       {/* <Clock /> */}
//       <Game />
//       <Toggle />
//       <Name />
//       <LoginControl />
//       <Mailbox unreadMessages={messages} />
//       <ExampleFalse />
//       <Page />
//     </>
// )




// function NumberList(props) {
//   const numbers = props.numbers;
//   const listItems = numbers.map((number) => <li key={number.toString()}>{number}</li>)
//   return (
//     <ul>{listItems}</ul>
//   )
// }

const numbers = [1, 2, 3, 4, 5]



function ListItem(props) {
  return <li>{props.value}</li>
}

function NumberList(props) {
  const numbers = props.numbers;
  ;
  return (
    <ul>
      {numbers.map((number) => <ListItem key={number.toString()} value={number} />)}
    </ul>
  )

}

function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>)}
    </ul>
  )
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  )
}

const posts = [
  { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
  { id: 2, title: 'Installation', content: 'You can install React from npm' }
];

//controlled components

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const basket = this.state.value
    const clickedFruit = event.target.value

    const alreadyInBasket = basket.find((item) => {
      return item === clickedFruit
    })

    let newBasket
    if (alreadyInBasket) {
      newBasket = basket.filter((item) => {
        return item !== clickedFruit
      })
    } else {
      newBasket = [...basket, clickedFruit]
    }

    console.log(newBasket)

    this.setState({
      value: newBasket
    })
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select multiple={true} value={this.state.value} onChange={this.handleChange}>
            <option value="grapefuit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="mango">Mango</option>
            <option value="coconut">Coconut</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(target, value)

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    )
  }
}


function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>
  }
  return <p>The water would NOT boil.</p>
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>
          Enter temperature in {scaleNames[scale]}:
        </legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { temperature: '', scale: 'c' };
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: 'c', temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: 'f', temperature })
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />

      </div>
    )
  }
}

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  )
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  )
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome" message="Thank you for visiting our spacecaft!" />
  )
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = { login: '' }
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program" message="How should we refer to you?">
        <input value={this.state.login} onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    )
  }

  handleChange(e) {
    this.setState({ login: e.target.value });
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`)
  }
}


function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  )
}

// function App() {
//   return (
//     <SplitPane left={
//       <Contacts />
//     }
//     right={
//       <Chat />
//     } />
//   )
// } //contacts and chat not defined yet.





// function SearchBar(props) {
//   return (
//     <div>
//       <input name="search" placeholder="Search..." />
//       <div>
//               <label>
//         <input type="checkbox" />
//         Only show products in stock
//       </label>
//       </div>

//     </div>
//   )
// }


class SearchBar extends React.Component {
  render() {
    const inStockOnly = this.props.checked;
    const value = this.props.value
    return (
      <form>
        <input type="text" placeholder="Search..." value={value} onChange={this.props.onChange} />
        <p>
          <input type="checkbox" checked={inStockOnly} onChange={this.props.onBoxChange} />
          {' '}
          Only show products in stock
        </p>
      </form>
    )
  }
}

// function ProductCategoryRow (props) {
//   return(
//     `Sporting Goods`
//   )
// }

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    )
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? product.name : <span style={{ color: 'red' }}>
      {product.name}
    </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
  }
}


class ProductTable extends React.Component {
  render() {
    let rows = [];
    let lastCategory = null;

    const showInStockOnly = this.props.checked;
    const searchValue = this.props.value;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(searchValue) === -1) {
        return;
      }
      if (showInStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow category={product.category} key={product.category} />
        );
      }
      rows.push(
        <ProductRow product={product} key={product.name} />
      );

      lastCategory = product.category;
    });


    // if (searchValue !== '') {
    //     rows = rows.filter((item) => {
    //       return searchValue == item.key;
    //   })
    // }


    // {console.log(rows[1].key)}

    // {console.log(rows[3].props.stocked)}

    // {console.log(typeof rows)}
    // if (showInStockOnly === true) {
    //     rows = rows.filter((item) => {
    //     if (item.props.stocked === undefined) return true;
    //     return item.props.stocked;
    //   })
    // console.log(rows);
    // }

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class FilteraleProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filterText: '', inStockOnly: false }

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleValueChange(e) {
    this.setState({ filterText: e.target.value });
  }

  handleCheckboxChange() {
    this.setState({ inStockOnly: !this.state.inStockOnly })
  }

  render() {

    return (
      <div>
        <br />
        <SearchBar value={this.state.filterText} onChange={this.handleValueChange} checked={this.state.inStockOnly} onBoxChange={this.handleCheckboxChange} />

        <ProductTable products={this.props.products} checked={this.state.inStockOnly} value={this.state.filterText} />
      </div>
    )
  }
}

const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];




function Example() {
  const [count, setCount] = useState(0);

  //similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // update the document title using the browser API
    document.title = `You clicked ${count} times`;
  }, [count]); // pass an array as an optional second argument: only re-run the effect if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}

function ExampleWithManyStates() {
  // Declare multiple state variables
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}

// function useFriendStatus(friendID) {
//   const [isOnline, setIsOnline] = useState(null);

//   useEffect(() => {
//     function handleStatusChange(status) {
//     setIsOnline(status.isOnline);
//   } //why is this function here??? what if this isn't here??

//     ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
//       return () => {
//     ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
//       };
//   }, [props.friend.id]); //only re-subscribe if props.friend.id changes

//   return isOnline;
// }

// function FriendStatus(props) {
//   const isOnline = useFriendStatus(props.friend.id);

//   if (isOnline === null) {
//     return 'Loading...';
//   }
//   return isOnline ? 'Online' : 'Offline';
// }

// function FriendListItem(props) {
//   const isOnline = useFriendStatus(props.friend.id);

//   return (
//     <li style={{ color: isOnline ? 'green' : 
//     'black' }}>
//       {props.friend.name}
//     </li>
//   )
// }


class DailyTime extends React.Component {
  render() {


    // let task;
    // if (this.props.taskList[0]) {
    //   if (this.props.taskList[0].subtasks) {
    //     if (this.props.tasklist[0].subtasks[0]) {
    //       ...
    //     }
    //   }
    // }

    // const task = this.props.taskList[0]?.subtasks?.[0]?.taskName

    // { console.log(this.props.taskList[0]?.taskName) }

    // let task;
    // if (this.props.taskList[0]) {
    //   task = this.props.taskList[0].taskName;
    // }

    // { console.log(this.props.taskList) }
    // const task = this.props.taskList;
    const time = new Array(25).fill(0)
    let timeIndex = time.map((hour, index) => (index + ':00  '))

    // if (this.props.taskList[0]) {

    //   //each date has its own list of tasks, this filter the tasks that belongs to a specific date
    //   const newTaskList = this.props.taskList.filter((taskObject) => {
    //     const taskDate = taskObject.taskDate
    //     const calendarDate = this.props.date

    //     return taskDate === calendarDate
    //   })

    //this uses task end time minus start time to calculate the height of the task shown on the calendar
    // newTaskList.map((taskObject) => {
    //   const index = taskObject.taskStartTime;
    //   const task = taskObject.taskName;

    //   let taskDuration = taskObject.taskEndTime - taskObject.taskStartTime;

    //   if (taskDuration === 0) {
    //     taskDuration = 1;
    //   }

    //   //better to use map() or forEach()???
    //   return (
    //     timeIndex[index] =
    //     <span className="taskField">
    //       <span>{timeIndex[index]}</span>   <span className="taskBlockElement" style={{
    //         height: 20 * taskDuration
    //       }}>{task}</span>
    //       {/* div span, does it matter? */}
    //     </span>
    //   )
    // })
    // const index = this.props.taskList[0].taskStartTime - 8;
    // timeIndex[index] = timeIndex[index] + task
    // }

    // return 'hello'
    // return <div>Hello</div>
    // return []

    //   ()
    // { }

    // () => 'hello'

    //   () => {
    //   return 'hello'
    // }

    // return { timeIndex }

    // return {
    //   timeIndex: [8, 9, 10]
    // }

    return (
      timeIndex.map((hr, i) => (
        <tr key={i}>
          <td className='hourOfDay'>{hr}</td>
          <td width="100%" className="timelineLinesWrapper">
            <div className="timelineLines" />
          </td>
        </tr>
      ))
    )


    // return (
    //   <div>
    //     {timeIndex.map()}
    //     {time[0]}
    //   </div>
    // )
  }
}

const TaskBlock = (props) => {
  // destructure same as doing props.taskList
  // <TaskBlock taskList={someListFromMasterBoard} />
  // remember: no "this" in hooks (functions)
  const { taskList } = props

  const calculateTaskHeight = (task) => {
    let taskDuration

    taskDuration = parseInt(task.taskEndTime) - parseInt(task.taskStartTime);

    if (taskDuration === 0) {
      taskDuration = 1;
    }

    return taskDuration
  }

  const calculateStartHeight = (task) => {
    let startHeight = 10 + 20 * parseInt(task.taskStartTime)

    return startHeight
  }

  return (
    <ul>
      {
        taskList.map((newTodo, index) =>
          <li key={newTodo.taskName + index.toString()} className="taskBlockElement" style={{
            top: calculateStartHeight(newTodo),
            // left: 70 + 10 * index,
            height: 20 * calculateTaskHeight(newTodo),
          }}
            onClick={() => { this.props.onTaskClick(index) }}>

            {newTodo.taskName}
          </li>
        )
      }
    </ul>
  )
}

// class _TaskBlock extends React.Component {

//   render() {

//     const newTodoList = this.props.taskList;
//     let taskDuration

//     //str.split(":")

//     newTodoList.map((taskObject) => {

//       taskDuration = parseInt(taskObject.taskEndTime) - parseInt(taskObject.taskStartTime);

//       if (taskDuration === 0) {
//         taskDuration = 1;
//       }

//       // console.log(taskObject)

//       return (taskDuration)


//     })

//     let listItems = newTodoList.map((newTodo, index) =>
//       <li className="taskBlockElement" style={{
//         top: 100,
//         height: 20 * taskDuration,
//       }}

//         key={index}
//         onClick={() => { this.props.onTaskClick(index) }}>

//         {newTodo.taskName}
//       </li>
//     )

//     return (
//       <ul>
//         {listItems}
//       </ul>
//     )
//   }

// }



const Calendar = (props) => {
  // const taskDate = props.newTaskDate.split('-')
  // const taskMonth = taskDate[1]
  // const taskDay = taskDate[2]
  const { taskList } = props

  const currentDay = props.currentDay;
  let currentMonth = currentDay.toLocaleString('default', { month: 'long' });
  let currentDate = currentDay.getDate();
  let currentMonthNumber = currentDay.getMonth() + 1;

  const tomorrow = new Date(currentDay);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let tomorrowMonth = tomorrow.toLocaleString('default', { month: 'long' });
  let tomorrowDate = tomorrow.getDate();
  let tomorrowMonthNumber = tomorrow.getMonth() + 1;

  const overmorrow = new Date(currentDay);
  overmorrow.setDate(overmorrow.getDate() + 2);
  let overmorrowMonth = overmorrow.toLocaleString('default', { month: 'long' });
  let overmorrowDate = overmorrow.getDate();
  let overmorrowMonthNumber = overmorrow.getMonth() + 1;

  const currentDayList =
    taskList.filter((task, index) => {
      const taskDate = task.newTaskDate.split('-')
      const taskMonth = taskDate[1]
      const taskDay = taskDate[2]
      if (parseInt(taskMonth) === currentMonthNumber && parseInt(taskDay) === currentDate) {
        return true
      }
      return false
    })

  const tomorrowList =
    taskList.filter((task, index) => {
      const taskDate = task.newTaskDate.split('-')
      const taskMonth = taskDate[1]
      const taskDay = taskDate[2]
      if (parseInt(taskMonth) === tomorrowMonthNumber && parseInt(taskDay) === tomorrowDate) {
        return true
      }
      return false
    })

  const overmorrowList =
    taskList.filter((task, index) => {
      const taskDate = task.newTaskDate.split('-')
      const taskMonth = taskDate[1]
      const taskDay = taskDate[2]
      if (parseInt(taskMonth) === overmorrowMonthNumber && parseInt(taskDay) === overmorrowDate) {
        return true
      }
      return false
    })

  return (
    <div className="calendar">
      {/* <div>
          <button>{'<'}&lt;</button>
        </div> */}

      <table className="day">
        <thead>
          <tr>
            <th colSpan={2}>
              <div className="date">
                <button onClick={props.handleJumpBack} >{'<'}&lt;</button>
                <button onClick={props.jumpToToday}>Today</button>
                <span>{currentMonth} {currentDate}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="taskBlockElementWrapper">
          <DailyTime />
          <TaskBlock taskName={props.taskName} taskList={currentDayList} taskStartTime={props.taskStartTime} taskEndTime={props.taskEndTime} />
        </tbody>
      </table>

      <table className="day">
        <thead>
          <tr>
            <th colSpan={2} className="date">{tomorrowMonth} {tomorrowDate}</th>
          </tr>
        </thead>
        <tbody className="taskBlockElementWrapper">
          <DailyTime />
          <TaskBlock taskName={props.taskName} taskList={tomorrowList} taskStartTime={props.taskStartTime} taskEndTime={props.taskEndTime} />
        </tbody>

      </table>
      <table className="day">
        <thead>
          <tr>
            <th colSpan={2} className="date">{overmorrowMonth} {overmorrowDate}</th>
            <th>  <button onClick={props.handleJumpForward} >{'>>'}</button> </th>
          </tr>
        </thead>
        <tbody className="taskBlockElementWrapper">
          <DailyTime />
          <TaskBlock taskName={props.taskName} taskList={overmorrowList} taskStartTime={props.taskStartTime} taskEndTime={props.taskEndTime} />
        </tbody>
      </table>

    </div>
  )
}

function TaskField(props) {
  return (
    <div>
      <div>
        <label>
          Task date:
          <input type="date" id="date" name="newDate" value={props.newTaskDate} onChange={props.onTaskChange} min="2023-01-01" max="2023-12-31" />
          {/* calendar only intake 2023 year's dates for now */}
        </label>

      </div>
      <div>
        <label>
          All day
          <input type='checkbox' id='allday' checked={props.allDayCheckbox} onChange={props.onCheckboxChange} />
        </label>
      </div>

      <div className={props.allDayCheckbox ? "timeSelection" : ''} >
        <div>
          <label>
            Start time:
            <input type="time" id="startTime" name="startTime" value={props.startTime} onChange={props.onTimeChange} />
          </label>
        </div>
        <div>
          <label>
            End time:
            <div className="endTimeWrapper">
              <input type="time" id="endTime" name="endTime" value={props.endTime} onChange={props.onTimeChange} />
              <span className={props.errorLine ? "errorLine" : ''} />
            </div>
          </label>
        </div>

      </div>

    </div>
  )
}

function NewTodo(props) {
  const newTodoList = props.value;

  const listItems = newTodoList.map((newTodo, index) =>
    <li className="masterboardTodos"

      key={index}
      onClick={() => { props.onTaskClick(index) }}>
      <p>
        {newTodo.taskName}
      </p>
      <p>
        {newTodo.newTaskDate}
      </p>

    </li>
  )

  // onTaskClick returns "apple"
  // const var1 = onTaskClick(newTodo)
  // console.log(var1); // "apple"

  // const var2 = () => onTaskClick(newTodo)
  // console.log(var2); // () => onTaskClick(newTodo)

  // console.log(listItems)

  return (
    <ul className="masterboardTodoList" >
      {listItems}
    </ul>
  )
}

class MasterBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { taskName: '', taskList: [], newDate: this.handleDateFormat(), allDayCheckbox: false, taskStartTime: '8', taskEndTime: '8', startTime: '09:00', endTime: '17:00', errorLine: false, currentDay: new Date(), date: this.handleDateFormat(), }

    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePreventSubmit = this.handlePreventSubmit.bind(this);
    this.handleTaskClick = this.handleTaskClick.bind(this);
    this.handleValidateTime = this.handleValidateTime.bind(this);
    this.handleJumpBackDays = this.handleJumpBackDays.bind(this);
    this.handleJumpForDays = this.handleJumpForDays.bind(this);
    this.handleJumpToToday = this.handleJumpToToday.bind(this);

    this.handleDateFormat = this.handleDateFormat.bind(this);
  }

  handleDateFormat() {
    let date = new Date()
    // TODO: Splitting by T removes timezone information so date might be off by some hours
    const format = date.toJSON().split('T')
    const formattedDate = format[0]

    return formattedDate
  }

  handleTaskChange(event) {
    const { name, value, } = event.target
    this.setState({ [name]: value })
  }

  handleCheckbox(event) {
    this.setState({ allDayCheckbox: event.target.checked })
  }

  handleSubmit(event) {
    const oldList = this.state.taskList;

    const newTask = {
      taskName: this.state.taskName,
      newTaskDate: this.state.newDate,
      taskStartTime: this.state.startTime,
      taskEndTime: this.state.endTime,
    };

    if (newTask.taskName === '') {
      newTask.taskName = 'New Task'
    }

    const newList = [...oldList, newTask];
    this.setState({ taskList: newList, taskName: '', allDayCheckbox: false })
    event.preventDefault();
  }

  handlePreventSubmit(event) {
    event.preventDefault();
    alert("Please enter a valid end time.")
  }

  handleTaskClick(index) {
    // console.log(`you just lickced ${index}  `)
    // console.log(this.state.taskList[index])

    const listItems = this.state.taskList.filter((item, newIndex) => {
      return (
        newIndex !== index
      )
    }
    )

    this.setState({ taskList: listItems })
  }

  handleValidateTime(event) {
    const { name, value, } = event.target

    this.setState({ [name]: value }, () => {
      const { startTime, endTime } = this.state

      // check time and setState
      if (endTime[0] < startTime[0]) {

        // props.onTimeValidation({
        //   target: {
        //     name: 'errorLine',
        //     value: true,
        //   }
        // });

        this.setState({ errorLine: true })

        return
      }

      if (endTime[0] === startTime[0]) {
        if (endTime[1] < startTime[1]) {
          this.setState({ errorLine: true })
          return
        } else {
          this.setState({ errorLine: false })
        }
      }

      this.setState({ errorLine: false })
    })
  }

  handleJumpBackDays() {
    const current = this.state.currentDay
    this.setState({ current: current.setDate(current.getDate() - 3) });
  }

  handleJumpForDays() {
    const current = this.state.currentDay
    this.setState({ current: current.setDate(current.getDate() + 3) })
  }

  handleJumpToToday() {
    this.setState({ currentDay: new Date() })
  }

  render() {
    return (
      <div>
        <Calendar taskList={this.state.taskList} newTaskDate={this.state.newDate} taskStartTime={this.state.startTime} taskEndTime={this.state.endTime} currentDay={this.state.currentDay} handleJumpBack={this.handleJumpBackDays} handleJumpForward={this.handleJumpForDays} jumpToToday={this.handleJumpToToday} />
        <form onSubmit={this.state.errorLine ? this.handlePreventSubmit : this.handleSubmit} className="masterboard">
          <p>Masterboard</p>
          <label>
            New task:
            <input
              type='text'
              name='taskName'
              placeholder='Enter task here'
              value={this.state.taskName}
              onChange={this.handleTaskChange}
            />
          </label>
          <TaskField newTaskDate={this.state.newDate} onTaskChange={this.handleTaskChange} allDayCheckbox={this.state.allDayCheckbox} onCheckboxChange={this.handleCheckbox} taskStartTime={this.state.taskStartTime} taskEndTime={this.state.taskEndTime} startTime={this.state.startTime} endTime={this.state.endTime} onTimeChange={this.handleValidateTime} errorLine={this.state.errorLine} />
          <input type='submit' value='Create a new task' />
          <NewTodo value={this.state.taskList} taskDate={this.state.newDate} onTaskClick={this.handleTaskClick} />


        </form>
      </div>

    )
  }
}



root.render(
  <>
    {/* <NumberList numbers={numbers} />
    <Blog posts={posts} />
    <NameForm />
    <EssayForm />
    <FlavorForm />
    <Reservation />
    <Calculator />
    <WelcomeDialog />
    <SignUpDialog />
    <FilteraleProductTable products={PRODUCTS} />
    <Example /> */}
    <MasterBoard />
  </>
)

// Hooks don’t work inside classes — they let you use React without classes.
// Hooks are a way to reuse stateful logic, not state itself
// the effect cleanup phase happens after every re-render, and not just once during unmounting

