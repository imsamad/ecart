import React from 'react';

const UploadPhoto = () => {
  return (
    <div>
      <Box
        sx={{
          width: 120,
          h: 100,
          borderRadius: '50%',
          border: 'red',
          border: 1,
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="images/Avatar.jpg"
          sx={{ width: '100%', height: '100%' }}
        />
      </Box>
      {/* https://randomuser.me/api/portraits/men/79.jpg */}
      <Box sx={{ my: 1 }}>
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" />
          <Button
            disableElevation
            variant="contained"
            component="span"
            size="small"
            startIcon={<PhotoCamera />}
          >
            Upload
          </Button>
        </label>
      </Box>
    </div>
  );
};

export default UploadPhoto;
