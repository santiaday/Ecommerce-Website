import React, {useState, useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';

const steps = ['Shipping Address' , 'Payment Details'];

const Checkout = ({ cart , order, onCaptureCheckout, error}) => {

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    const navigate = useNavigate();


    useEffect(() => {
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                console.log(token);

                setCheckoutToken(token);
            }catch (error){
                navigate.pushState('/');
            }
        }

        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);

        nextStep();
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    }

    let Confirmation = () => order.customer ? (
        <>
        <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order Reference: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </> 
    ) : isFinished ? (
        <>
        <div>
            <Typography variant="h5">Thank you for your purchase.</Typography>
            <Divider className={classes.divider} />
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </> 
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if(error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    }

    const Form = () => activeStep == 0 
        ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} next={next} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout}/>
    

  return (
    

    <>
    <CssBaseline />
        <div className = {classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.Paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>

        </main>
    </>
  )
}

export default Checkout