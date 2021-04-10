import React, { ReactElement } from 'react';
import neofetch from '../../utils/neofetch';

export default function CardManagement(): ReactElement {
  // const onInsert = ({}) => {};

  const onDelete = async ({ cardId }: { cardId: string }) => {
    // card id is number!
    const cardNumber = Number(cardId);

    const { success } = await neofetch({
      url: '/card',
      method: 'DELETE',
      jsonData: { id: cardNumber },
    });

    // use snackbar to inform user
    if (!success) {
      // TODO: inform failure
    } else {
      // TODO: inform success
    }
  };

  return <></>;
}
