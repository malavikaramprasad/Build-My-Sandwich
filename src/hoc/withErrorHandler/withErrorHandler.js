import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Holder from '../Holder/Holder';
import axios from '../../axios-orders';

const withErrorHandler = (WrappedComponent) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState({error:null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error=>{
                this.setState({error:error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler =() => {
            this.setState({error:null})
         };

        render(){
            return(
                <Holder>
                    <Modal showModal={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Holder>
            )
        }
    }
};
export default withErrorHandler;