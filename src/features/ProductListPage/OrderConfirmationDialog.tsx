import { forwardRef, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Typography } from '@mui/material';
import { useCart } from '../../core/CartDataProvider/CartContext';
import CartItem from '../../shared/ProductCart/CartItem';
import CustomButton from '../../components/Button';

interface OrderConfirmationDialogProps {
  open: boolean;
  closeDialog: () => void;
  startNewOrderCallback: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OrderConfirmationDialog: React.FC<OrderConfirmationDialogProps> = ({
  open,
  closeDialog,
  startNewOrderCallback,
}) => {
  const { cartItems, totalCartValue } = useCart();

  const handleClose = useCallback(() => {
    closeDialog();
  }, [closeDialog]);

  const onStartNewOrderClick = useCallback(() => {
    startNewOrderCallback();
  }, [startNewOrderCallback]);

  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={handleClose}
      aria-describedby="order-confirmation-dialog-description"
    >
      <Box py={4} px={2}>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleOutlineIcon fontSize="large" color="success" sx={{ mr: 1 }} />
            <Typography variant="h4" fontWeight={600}>
              {'Order Confirmed'}
            </Typography>
          </Box>
          <Box mt={1} ml={1}>
            <Typography variant="subtitle1" color="textSecondary">
              {'We hope you enjoy your food'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box px={3} borderRadius={2} sx={{ backgroundColor: '#FBF7F4' }}>
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} showMedia readonly />
            ))}
            <Box
              width="100%"
              py={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1" color="textSecondary" fontWeight={600}>
                {'Order Total'}
              </Typography>
              <Typography variant="h5" color="textPrimary" fontWeight={600}>
                {`$${totalCartValue}`}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3 }}>
          <CustomButton fullWidth onClick={onStartNewOrderClick}>
            <Typography variant="subtitle1">Start New Order</Typography>
          </CustomButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default OrderConfirmationDialog;
