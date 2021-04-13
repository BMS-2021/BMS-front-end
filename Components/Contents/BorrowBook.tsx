import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useImmer } from 'use-immer';
import { Paper } from '@material-ui/core';
import BookTable, { BookData } from '../BookTable';
import neofetch from '../../utils/neofetch';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      margin: theme.spacing(0, 5, 0),
    },
    buttons: {
      width: '100%',
      display: 'flex',
      alignItems: '',
      justifyContent: 'center',
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '100%',
      textAlign: 'center',
    },
    paper: {
      '@media (min-width: 800px)': {
        width: '70%',
        marginLeft: '15%',
      },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: theme.spacing(4, 0, 4),
      padding: theme.spacing(4, 0, 4),
      flexWrap: 'wrap',
    },
    input: {
      margin: theme.spacing(2, 0, 2),
    },
  })
);

export default function BorrowBook({
  actionUrl,
}: {
  actionUrl: string;
}): ReactElement {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [cardIdInput, setCardIdInput] = React.useState('');
  const [bookIdInput, setBookIdInput] = React.useState('');
  const [bookRows, setBookRows] = React.useState<BookData[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const stepData = [
    {
      name: '输入借书证号',
      content: (
        <>
          <Typography className={classes.instructions}>
            输入借书证号以进入下一步：
          </Typography>
          <TextField
            key='cardId'
            className={classes.input}
            type='number'
            value={cardIdInput}
            label='借书证号'
            variant='outlined'
            onChange={(e) => setCardIdInput(e.target.value)}
          />
        </>
      ),
      okAction: async () => {
        if (cardIdInput.length < 1) throw '请输入借书证号~';
        // console.log(cardIdInput);
        const { success, data } = await neofetch({
          url: `/borrow?cardId=${Number(cardIdInput)}`,
        });

        if (!success) throw data as string;

        setBookRows((data ?? []) as BookData[]);
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
            className={classes.input}
            key='bookId'
            type='number'
            value={bookIdInput}
            label='书号'
            variant='outlined'
            onChange={(e) => setBookIdInput(e.target.value)}
          />
        </>
      ),
      okAction: async () => {
        if (bookIdInput.length < 1) throw '请输入书号';
      },
      dataDisplay: <BookTable rows={bookRows} />,
    },
    {
      name: '确认信息',
      content: (
        <>
          <Typography className={classes.instructions}>请确认信息</Typography>
          <Typography className={classes.instructions}>
            借书证号: {cardIdInput}
          </Typography>
          <Typography className={classes.instructions}>
            书号: {bookIdInput}
          </Typography>
        </>
      ),
      okAction: async () => {
        // throw 233;
        const { success, data } = await neofetch({
          url: actionUrl,
          method: 'POST',
          jsonData: {
            bookId: Number(bookIdInput),
            cardId: Number(cardIdInput),
          },
        });

        if (!success) {
          enqueueSnackbar(data as string);
          throw data as string;
        } else {
          enqueueSnackbar('借书成功!');
          setBookIdInput('');
          setCardIdInput('');
        }
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
      setIsErrorList((draft) => {
        draft.errors[activeStep] = false;
      });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (e) {
      enqueueSnackbar(e);
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
              <StepLabel error={isErrorList.errors[index]}>{name}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Paper elevation={3} className={classes.paper}>
        {activeStep === steps.length ? (
          <>
            <Typography className={classes.instructions}>借书完成~</Typography>
            <Button onClick={handleReset} className={classes.button}>
              再借一本
            </Button>
          </>
        ) : (
          <>
            {stepData[activeStep].content}
            <div className={classes.buttons}>
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
              >
                {activeStep === steps.length - 1 ? '确认' : '下一步'}
              </Button>
            </div>
          </>
        )}
      </Paper>
      {stepData[activeStep]?.dataDisplay}
    </div>
  );
}
