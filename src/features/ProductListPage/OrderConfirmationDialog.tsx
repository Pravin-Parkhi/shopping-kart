import { forwardRef, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Tooltip, Typography } from '@mui/material';
import { useCart } from '../../core/CartDataProvider/CartContext';
import CartItem from '../../shared/ProductCart/CartItem';
import CustomButton from '../../components/Button';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

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
  const { cartItems, discountedTotal, appliedCoupon } = useCart();

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
      fullWidth
      onClose={handleClose}
      aria-describedby="order-confirmation-dialog-description"
    >
      <Box pt={2} pb={4}>
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
            {appliedCoupon && (
              <Box display="flex" alignItems="center" justifyContent="space-between" pt={1}>
                <Typography variant="body2" color="textSecondary">
                  {'Applied Coupon'}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Tooltip title="18% discount is applied on total order value." placement="top">
                    <InfoOutlineIcon fontSize="small" color="success" />
                  </Tooltip>
                  <Typography
                    variant="body2"
                    color="success"
                    display="flex"
                    alignItems="center"
                    sx={{ pl: 1 }}
                  >
                    {`${appliedCoupon}`}
                  </Typography>
                </Box>
              </Box>
            )}
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
                {`$${discountedTotal}`}
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
