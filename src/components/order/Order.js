import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from "styled-components";
import { InputGroup } from "../../components/role/style/role.styled";
import Role from "../../components/role";
import axios from "axios";

const steps = ['Place Order', 'Order Placed', 'Order Confirmed'];

function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step when not placing order.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Your order is confirmed.</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Order is placed.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

const AuthForm = styled.form`
	...
`;

const DropDownSelect = () => {
  return (
    <AuthForm onSubmit="">
      <h2>Select Address</h2>
      <InputGroup>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          id="name"
          type="name"
          placeholder="Name"
          className="inputs"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="contact number">Contact Number</label>
        <input
          name="contact number"
          id="contact number"
          type="contact number"
          placeholder="Contact Number"
          className="inputs"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="street">Street</label>
        <input
          name="street"
          id="street"
          type="street"
          placeholder="Street"
          className="inputs"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="city">City</label>
        <input
          name="city"
          id="city"
          type="city"
          placeholder="City"
          className="inputs"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="state">State</label>
        <input
          name="state"
          id="state"
          type="state"
          placeholder="State"
          className="inputs"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="landmark">Landmark</label>
        <input
          name="landmark"
          id="landmark"
          type="landmark"
          placeholder="Landmark"
          className="inputs"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="zip code">Zip Code</label>
        <input
          name="zip code"
          id="zip code"
          type="zip code"
          placeholder="Zip Code"
          className="inputs"
        />
      </InputGroup>
      <Role />
   </AuthForm>
  );
};

export default (DropDownSelect)(HorizontalLinearStepper);