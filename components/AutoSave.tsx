import React from "react";
import { FormSpy } from "react-final-form";
import diff from "object-diff";

class AutoSave extends React.Component {
  promise?: any;
  timeout?: any;
  submitting?: any;
  props: any;
  state: any;

  constructor(props) {
    super(props);
    this.state = {
      values: props.values,
      submitting: false,
      debounce: props.debounce,
    };
  }

  componentDidUpdate() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(this.save, this.state.debounce);
  }

  save = async () => {
    if (this.promise) {
      await this.promise;
    }
    const { values, setCalculatingTotal, setTotal, watchlist } = this.props;

    const difference = diff(this.state.values, values);

    if (
      (Object.keys(difference).length === 1 && !difference.username) ||
      (Object.keys(difference).length > 1 && difference.username)
    ) {
      setCalculatingTotal(true);
      let newTotal = 0;

      for (const [key, value] of Object.entries(values)) {
        const foundCoin = watchlist.find((coin) => coin.id === key);
        if (!foundCoin) continue;
        const price = foundCoin.market_data.current_price.usd;
        newTotal = newTotal + price * Number(value);
      }

      this.setState({ submitting: true, values });

      this.setState({ submitting: false });
      setTimeout(() => {
        setCalculatingTotal(false);
        setTotal(newTotal);
      }, 1000);
    }
  };

  render() {
    return this.state.submitting && <div>Submitting...</div>;
  }
}

// Make a HOC
// This is not the only way to accomplish auto-save, but it does let us:
// - Use built-in React lifecycle methods to listen for changes
// - Maintain state of when we are submitting
// - Render a message when submitting
// - Pass in debounce and save props nicely
export default (props) => (
  <FormSpy {...props} subscription={{ values: true }} component={AutoSave} />
);
