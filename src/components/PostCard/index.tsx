import CameraAltOutlined from '@mui/icons-material/CameraAltOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
function PostCard() {
  return (
    <Box sx={{ width: `calc((${window.screen.width}px - 240px) / 2)`, margin: '24px auto' }}>
      <Paper sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', gap: '0 8px', alignItems: 'center' }}>
          <Avatar>N</Avatar>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Nguyen Tran
            </Typography>
            <Typography variant="body2">February 9 at 10:46</Typography>
          </Box>
        </Box>
        <Typography variant="body1" margin="12px 0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque magni laudantium autem,
          alias sit fugiat aut est, eaque, accusamus praesentium sint nostrum et explicabo atque
          quis veniam inventore dolorem officia.
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="body2" marginLeft="auto">
            2 comments
          </Typography>
        </Box>
        <Divider sx={{ margin: '4px 0' }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0 4px',
            width: '50%',
            margin: '0 auto',
          }}
        >
          <Button variant="text" startIcon={<CameraAltOutlined />} sx={{ flex: 1 }}>
            Like
          </Button>
          <Button variant="text" startIcon={<CameraAltOutlined />} sx={{ flex: 1 }}>
            Comment
          </Button>
        </Box>
        <Divider sx={{ margin: '4px 0' }} />
        {/* Comment */}
        <Box marginTop={2}>
          <Box sx={{ display: 'flex', gap: '0 10px' }}>
            <Avatar sx={{ width: 32, height: 32 }}>N</Avatar>
            <Box>
              <Paper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#F2F3F5',
                  padding: 1,
                  borderRadius: 4,
                }}
              >
                <Typography variant="body1" fontWeight={600}>
                  Nguyen Tran
                </Typography>
                <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab reprehenderit iste
                  ducimus commodi tempore veritatis corrupti sed molestiae cum provident asperiores
                  illo facilis autem ea, ipsum perferendis dolorum architecto delectus.
                </Typography>
              </Paper>
              <ButtonGroup>
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    ':hover': {
                      backgroundColor: 'unset',
                      textDecoration: 'underline',
                    },
                    color: '#65676B',
                    fontWeight: 600,
                    width: 'fit-content',
                    minWidth: 'unset',
                    px: 0,
                  }}
                  disableTouchRipple
                >
                  Like
                </Button>
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    ':hover': {
                      backgroundColor: 'unset',
                      textDecoration: 'underline',
                    },
                    color: '#65676B',
                    fontWeight: 600,
                    width: 'fit-content',
                    minWidth: 'unset',
                    px: 0,
                  }}
                  disableTouchRipple
                >
                  Reply
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default PostCard;
