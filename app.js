class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: '0',
            operator: null,
            waitingForOperand: false,
            value: null
        };
    }

    inputDigit(digit) {
        const { displayValue, waitingForOperand } = this.state;

        if (waitingForOperand) {
            this.setState({
                displayValue: String(digit),
                waitingForOperand: false
            });
        } else {
            this.setState({
                displayValue: displayValue === '0' ? String(digit) : displayValue + digit
            });
        }
    }

    inputDot() {
        const { displayValue } = this.state;

        if (!/\./.test(displayValue)) {
            this.setState({
                displayValue: displayValue + '.',
                waitingForOperand: false
            });
        }
    }

    clearDisplay() {
        this.setState({
            displayValue: '0'
        });
    }

    toggleSign() {
        const { displayValue } = this.state;

        this.setState({
            displayValue: displayValue.charAt(0) === '-' ? displayValue.substring(1) : '-' + displayValue
        });
    }

    handleBakspace() {
        const { displayValue } = this.state;
        
        this.setState({
            displayValue: displayValue.length > 1 ? displayValue.slice(0, -1) : '0'
        });
    }

    performOperation(nextOperator) {
        const { displayValue, operator, value } = this.state;
        const inputValue = parseFloat(displayValue);

        if (value == null) {
            this.setState({
                value: inputValue
            });
        } else if (operator) {
            const currentValue = value || 0;
            const newValue = this.calculate(currentValue, inputValue, operator);

            this.setState({
                value: newValue,
                displayValue: String(newValue)
            });
        }

        this.setState({
            waitingForOperand: true,
            operator: nextOperator
        });
    }

    calculate(firstOperand, secondOperand, operator) {
        if (operator === '+') {
            return firstOperand + secondOperand;
        } else if (operator === '-') {
            return firstOperand - secondOperand;
        } else if (operator === '*') {
            return firstOperand * secondOperand;
        } else if (operator === '/') {
            return firstOperand / secondOperand;
        }
        return secondOperand;
    }

    render() {
        const { displayValue } = this.state;

        return (
            <div className="calculator">
                <div className="display">{displayValue}</div>
                <button className="button" onClick={() => this.clearDisplay()}>AC</button>
                <button className="button" onClick={() => this.handleBakspace()}>
                    <i class="fa-solid fa-delete-left"></i>
                </button>
                <button className="button" onClick={() => this.toggleSign()}>±</button>
                <button className="button operator" onClick={() => this.performOperation('/')}>÷</button>
                <button className="button" onClick={() => this.inputDigit(7)}>7</button>
                <button className="button" onClick={() => this.inputDigit(8)}>8</button>
                <button className="button" onClick={() => this.inputDigit(9)}>9</button>
                <button className="button operator" onClick={() => this.performOperation('*')}>×</button>
                <button className="button" onClick={() => this.inputDigit(4)}>4</button>
                <button className="button" onClick={() => this.inputDigit(5)}>5</button>
                <button className="button" onClick={() => this.inputDigit(6)}>6</button>
                <button className="button operator" onClick={() => this.performOperation('-')}>−</button>
                <button className="button" onClick={() => this.inputDigit(1)}>1</button>
                <button className="button" onClick={() => this.inputDigit(2)}>2</button>
                <button className="button" onClick={() => this.inputDigit(3)}>3</button>
                <button className="button operator" onClick={() => this.performOperation('+')}>+</button>
                <button className="button zero" onClick={() => this.inputDigit(0)}>0</button>
                <button className="button" onClick={() => this.inputDot()}>.</button>
                <button className="button operator" onClick={() => this.performOperation('=')}>=</button>
            </div>
        );
    }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Calculator />);