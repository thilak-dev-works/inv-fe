import { Button, Stack } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

export default function ImportModule(props) {
    const navigate = useNavigate();

    const handleImportClick = () => {
        navigate('/import-page'); // Updated to match the new route
    };
    return (
        <div className="importmodule">
            <Stack direction={"column"} spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 25,
                }} >
                <div className="logo"></div>
                <Button color="primary" variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleImportClick}> Import Products</Button>
                <Button color="primary" variant="outlined"> Download sample .CSV</Button>

            </Stack>
        </div>
    )
}