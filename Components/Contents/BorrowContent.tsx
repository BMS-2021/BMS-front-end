import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useImmer } from 'use-immer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

export default function BorrowContent(): ReactElement {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [cardIdInput, setCardIdInput] = React.useState('');
  const [bookIdInput, setBookIdInput] = React.useState('');
  const stepData = [
    {
      name: '输入借书证号',
      content: (
        <>
          <Typography className={classes.instructions}>
            输入借书证号以进入下一步：
          </Typography>
          <TextField
            label='借书证号'
            variant='outlined'
            onChange={(e) => setCardIdInput(e.target.value)}
          />
        </>
      ),
      okAction: async () => {
        console.log(cardIdInput);
        //let data = await fetch('getBookByCardId', 'GET', {cardId})
      },
    },
    {
      name: '输入书号',
      content: (
        <>
          <Typography className={classes.instructions}>
            输入书号以进入下一步：
          </Typography>
          <TextField
            label='书号'
            variant='outlined'
            onChange={(e) => setBookIdInput(e.target.value)}
          />
        </>
      ),
      okAction: async () => {
        //let data = await fetch('getStockByCardId', 'GET', {bookId})
        console.log(bookIdInput);
      },
    },
    {
      name: '确认信息',
      content: (
        <Typography className={classes.instructions}>请确认借阅信息</Typography>
      ),
      okAction: async () => {
        throw 233;
        // let data = await fetch('borrowBook', 'POST', {cardId, bookId})
      },
    },
  ];
  const getSteps = () => {
    return stepData.map((step) => step.name);
  };
  const [isErrorList, setIsErrorList] = useImmer({
    errors: new Array<boolean>(stepData.length).fill(false),
  });

  const steps = getSteps();

  const handleNext = async () => {
    try {
      await stepData[activeStep].okAction();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (e) {
      setIsErrorList((draft) => {
        draft.errors[activeStep] = true;
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setIsErrorList((draft) => {
      draft.errors[activeStep] = false;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsErrorList((draft) => {
      draft.errors = draft.errors.map(() => false);
    });
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {stepData.map(({ name }, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (isErrorList.errors[index]) {
            labelProps.error = true;
          }
          return (
            <Step key={name} {...stepProps}>
              <StepLabel {...labelProps}>{name}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>借书完成~</Typography>
            <Button onClick={handleReset} className={classes.button}>
              再借一本
            </Button>
          </div>
        ) : (
          <div>
            {stepData[activeStep].content}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                上一步
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                className={classes.button}
                disabled={isErrorList.errors[activeStep]}
              >
                {activeStep === steps.length - 1 ? '确认' : '下一步'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
