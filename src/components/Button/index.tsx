import Button, { type ButtonProps } from '@mui/material/Button';

const CustomButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      sx={{
        borderRadius: 10,
        px: 3,
        py: 1,
        textTransform: 'none',
        color: '#EEBBA3',
        backgroundColor: 'primary.main',
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
