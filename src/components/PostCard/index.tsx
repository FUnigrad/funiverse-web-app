import CameraAltOutlined from '@mui/icons-material/CameraAltOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Editor from 'components/Editor';
function PostCard() {
  return (
    <Box sx={{ width: `calc((${window.screen.width}px - 240px) / 2)`, mx: 'auto', mb: '32px' }}>
      <Paper sx={{ padding: 2 }}>
        <PostCardHeader />
        <Typography
          variant="body1"
          margin="12px 0"
          fontSize={16}
          dangerouslySetInnerHTML={{
            __html:
              '<p><span class="mention" data-index="0" data-denotation-char="@" data-id="1" data-value="Fredrik Sundqvist">﻿<span contenteditable="false"><span class="ql-mention-denotation-char">@</span>Fredrik Sundqvist</span>﻿</span> test</p>',
          }}
        />
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
          <Box sx={{ display: 'flex', gap: '0 8px' }}>
            <Avatar sx={{ width: 32, height: 32 }}>N</Avatar>
            <Box>
              <Paper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#F2F3F5',
                  padding: 1,
                  pr: 2,
                  borderRadius: 4,
                }}
              >
                <Typography variant="body1" fontWeight={600}>
                  Nguyen Tran
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ wordBreak: 'break-word', mt: '2px' }}
                  dangerouslySetInnerHTML={{
                    __html:
                      '<p><span class="mention" data-index="0" data-denotation-char="@" data-id="1" data-value="Fredrik Sundqvist">﻿<span contenteditable="false"><span class="ql-mention-denotation-char">@</span>Fredrik Sundqvist</span>﻿</span> test</p>',
                  }}
                />
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
                    height: '20px',
                    p: 0,
                  }}
                  disableTouchRipple
                >
                  Like
                </Button>
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    ':hover': { backgroundColor: 'unset', textDecoration: 'underline' },
                    color: '#65676B',
                    fontWeight: 600,
                    width: 'fit-content',
                    minWidth: 'unset',
                    height: '20px',
                    p: 0,
                  }}
                  disableTouchRipple
                >
                  Reply
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
          <Avatar sx={{ width: 32, height: 32, display: 'inline-flex', mr: '8px' }}>A</Avatar>
          <Box sx={{ borderRadius: 5, width: '100%', display: 'inline-block' }}>
            <Editor
              className="comment-quill-editor"
              bounds=".comment-quill-editor"
              placeholder="Write a comment..."
              disableNewLineByEnter
              onKeyDown={(event: KeyboardEvent) => {
                if (event.key === 'Enter') {
                  //TODO: handle submit here
                }
              }}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default PostCard;

function PostCardHeader() {
  return (
    <Box sx={{ display: 'flex', gap: '0 8px', alignItems: 'center' }}>
      <Avatar>N</Avatar>
      <Box>
        <Typography variant="h4" fontWeight={600}>
          Nguyen Tran
        </Typography>
        <Typography variant="body2">February 9 at 10:46</Typography>
      </Box>
    </Box>
  );
}
