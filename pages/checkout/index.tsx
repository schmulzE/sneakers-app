import React, { useState } from 'react';
import { GetServerSideProps } from "next";
import {getSession, useSession } from "next-auth/react";
import AuthForm from "../../components/AuthForm";
import Stepper from "../../components/Stepper";
import StepperControl from "../../components/StepperControl";
import { UseContextProvider } from "../../store/stepper_context";

import Payment from "../../components/steps/Payment";
import Delivery from "../../components/steps/Delivery";
import Review from "../../components/steps/Review";
// import Final from "./components/steps/Final";


export default function Component() {
  const { data: session } = useSession()

    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
      "Delivery",
      "Payment",
      "Review",
    ];

    const displayStep = (step: number) => {
      switch (step) {
        case 1:
          return <Delivery />;
        case 2:
          return <Payment />;
        case 3:
          return <Review />;
        default:
      }
    };

    const handleClick = (direction: string) => {
      let newStep = currentStep;

      direction === "next" ? newStep++ : newStep--;
      // check if steps are within bounds
      newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    };
  // if (session) {
    return (
      <>     
        {/* Signed in as {session.user?.email}  */}
          {/* Stepper */}
        <div className="horizontal container mt-5 ">
          <Stepper steps={steps} currentStep={currentStep} />

          <div className="my-10 p-10 ">
            <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
          </div>
        </div>

        {/* navigation button */}
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </>
    )
  }

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  
  if(!session){
    return {
      redirect: {
        destination:'/checkout/bag',
        permanent: false
      }
    }
  }

  return {
    props: {session}
  }
}