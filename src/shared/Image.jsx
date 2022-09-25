import { Component } from 'react';
import assetUrl from '../api/assetUrl';

const FailedImage = ({ error, ...props }) => <span {...props}>{error}</span>
const SuccessImage = (props) => <img {...props} />
const PendingImage = (props) => <span {...props}>Loading...</span>

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      error: undefined,
      url: undefined,
    };
  }

  componentDidMount() {
    this.$drop = false;
    const { src } = this.props;
    if (!src) return this.setState({error: 'no source'});

    assetUrl(src).then((url) => {
      if (this.$drop) return;

      this.setState({ ready: true, url });
    }).catch((err) => {
      if (this.$drop) return;

      console.warn('IMAGE RESOLVE ERROR:', err);
      this.setState({ ready: false, error: 'Resolve error' });
    });
  }

  componentWillUnmount() {
    this.$drop = true;
  }

  render() {
    const { ready, error, url } = this.state;
    const { src, ...other } = this.props;
    if (error) return <FailedImage error={error} {...other} />;
    if (ready) return <SuccessImage src={url} {...other} />;

    return <PendingImage {...other} />;
  }
}

export default Image;
