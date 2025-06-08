import type React from 'react';
import { TextField, Button, Box, Typography, Tooltip } from '@mui/material';
import { useCart } from '../../core/CartDataProvider/CartContext';
import { useCallback, useMemo, useState } from 'react';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

const AVAILABLE_COUPONS = ['HAPPYHOURS'];

const CouponWidget: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [isInvalidCoupon, setIsInvalidCoupon] = useState<boolean>(false);

  const { applyCoupon, removeCoupon, appliedCoupon } = useCart();

  const handleApply = useCallback(() => {
    const trimmedValue = code.trim();
    if (AVAILABLE_COUPONS.includes(trimmedValue)) {
      applyCoupon(trimmedValue.toUpperCase());
    } else {
      setIsInvalidCoupon(true);
    }
  }, [applyCoupon, code]);

  const handleCouponChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isInvalidCoupon) {
        setIsInvalidCoupon(false);
      }
      setCode(event.target.value);
    },
    [isInvalidCoupon]
  );

  const enableApplyCouponButton = useMemo(() => code?.length, [code.length]);

  return (
    <Box mt={2}>
      {appliedCoupon ? (
        <>
          <Box display="flex" alignItems="center" justifyContent="space-between">
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
            <Button variant="outlined" onClick={removeCoupon}>
              Remove
            </Button>
          </Box>
        </>
      ) : (
        <Box display="flex">
          <TextField
            fullWidth
            error={isInvalidCoupon}
            label="Coupon Code"
            value={code}
            onChange={handleCouponChange}
            size="small"
            helperText={isInvalidCoupon && 'Please enter valid coupon.'}
          />
          <Button
            variant="contained"
            onClick={handleApply}
            disabled={!enableApplyCouponButton}
            sx={{ ml: 2, alignSelf: 'flex-start' }}
          >
            Apply
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CouponWidget;
