import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

const TopCards = (props: { name: string; difference: number; positive?: false | true; value: number; icon: any; color: string; }) => {
  const { name, difference, positive = false, value, icon, color } = props;

  return (
    <Card className='shadow-2xl dark:shadow-whiteBG/10 bg-white dark:bg-darkBGLighter text-black dark:text-white rounded-lg w-2/4'>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
              className='-tracking-wide'
            >
              {name}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>

          <Avatar
            sx={{
              // backgroundColor: 'error.main',
              bgcolor: [color],
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              {icon}
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <FaArrowUpLong /> : <FaArrowDownLong />}
              </SvgIcon>
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Desde o último mês
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default TopCards;