import React, { ReactElement, useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import neofetch from '../utils/neofetch';
import { useSnackbar } from 'notistack';
import { Typography } from '@material-ui/core';

export interface ConfirmationDialogRawProps {
  classes: Record<'paper', string>;
  id: string;
  keepMounted: boolean;
  open: boolean;
  onClose: (value?: string) => void;
}
export default function UploadFileModal(
  props: ConfirmationDialogRawProps
): ReactElement {
  const { onClose, open, ...other } = props;
  const radioGroupRef = React.useRef<HTMLElement>(null);

  const [fileData, setFileData] = useState<File | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = async () => {
    if (fileData === null) onClose();
    console.log(fileData);
    const fetchBody = new FormData();
    fetchBody.append('file', fileData);
    const { success, data } = await neofetch({
      url: '/books',
      method: 'PUT',
      body: fetchBody,
      contentType: undefined,
    });

    if (!success) {
      enqueueSnackbar(data as string);
    } else {
      enqueueSnackbar('导入成功!');
      onClose();
    }
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='xs'
      onEntering={handleEntering}
      aria-labelledby='confirmation-dialog-title'
      open={open}
      {...other}
    >
      <DialogTitle id='confirmation-dialog-title'>从文件导入..</DialogTitle>
      <DialogContent dividers>
        <input
          accept='.csv'
          id='file-upload'
          type='file'
          hidden
          onChange={(e) => setFileData(e.target.files[0])}
        />
        <label htmlFor='file-upload'>
          <Button variant='outlined' component='span' color='primary'>
            Upload
          </Button>
          <Typography>{fileData?.name}</Typography>
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button autoFocus onClick={handleOk} color='primary'>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
