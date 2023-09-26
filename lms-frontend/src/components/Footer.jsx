import { Box, Divider, Grid, Typography, Link } from "@mui/material";
import { grey } from "@mui/material/colors";

const Footer = () => {
  return (
    <Grid component="footer" sx={{ bgcolor: grey[300] }}>
      <Box
        sx={{
          pt: 4,
          pb: 8,
          display: "grid",
          gridAutoColumns: "1fr",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr",
            md: "1fr 1.75fr",
            lg: "1fr 1fr",
          },
          gridTemplateRows: "auto",
          "& a:not(.MuiIconButton-root)": {
            mt: 1,
            color: "text.secondary",
            typography: "body2",
            "&:hover": {
              color: "primary.main",
              textDecoration: "underline",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              marginX: 10,
            }}
          >
            <Link>About Us</Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:aong@77global.biz,ejaropojop@88global.biz"
            >
              Contact us
            </Link>
          </Box>
        </Box>
      </Box>
      <Divider variant="middle" />
      <Box
        sx={{
          py: 4,
          display: { xs: "block", sm: "flex" },
          alignItems: { sm: "center" },
          justifyContent: { sm: "center" },
        }}
      >
        <Typography color="text.secondary" variant="body2">
          Copyright © {new Date().getFullYear()} æ.codes
        </Typography>
      </Box>
    </Grid>
  );
};

export default Footer;
