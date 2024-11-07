import titleicon1 from "../assets/pageimages/titleicon.png";
import CustomTable from '../components/basicTable';
import PieChartFlow from '../components/piechart';
import TitleBoard from '../components/titleBoard';
import AllProducts from './allproducts';


const inventoryRows = [
    { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
    { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
];

const inventoryHeaders = [
    { id: 'name', label: 'Gemstones' },
    { id: 'calories', label: 'Jewelry' },
    { id: 'fat', label: ' Drops & Beads' },
    { id: 'carbs', label: 'Semi-Mounts' },
    { id: 'protein', label: 'Findings' },
];

const desktopOS = [
    { label: 'Quantity in hand', value: 890, color: '#47CD89' },
    { label: 'Quantity to be received', value: 190, color: '#FDB022' }

];

function Home() {
    return (
        <>
            <div className="home-dashboardcontent1">
                <div className="home-inventoryview">
                    <TitleBoard title={'Inventory Overview'} subtitle={'View and analyse what we have.'} image={titleicon1} />
                    <div className='home-inventorytable'>
                        <CustomTable headers={inventoryHeaders} rows={inventoryRows} />
                    </div>

                </div>
                <div className="home-stockview">
                    <TitleBoard title={'Total stock overview'} subtitle={'View and analyse what we have.'} image={titleicon1} />
                    <PieChartFlow chartdata={desktopOS} />
                </div>
            </div>
            <div className="component4">
                <TitleBoard title={'Low Stock Alert'} subtitle={'View and analyse what we have.'} image={titleicon1} />

                {/* <CustomDataGrid /> */}
                <AllProducts />
            </div>
        </>
    )
}

export default Home;