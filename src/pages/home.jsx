import titleicon1 from "../assets/pageimages/titleicon.png";
import titleicon2 from "../assets/pageimages/titleicon2.png";
import titleicon3 from "../assets/pageimages/titleicon3.png";
import InventorySummary from "../components/basicTable";
import PieChartFlow from '../components/piechart';
import TitleBoard from '../components/titleBoard';
import LowStockProducts from "./lowstockproducts";

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
                        <InventorySummary />
                    </div>

                </div>
                <div className="home-stockview">
                    <TitleBoard title={'Total stock overview'} subtitle={'View and analyse what we have.'} image={titleicon3} />
                    <PieChartFlow chartdata={desktopOS} />
                </div>
            </div>
            <div className="component4">
                <TitleBoard title={'Low Stock Alert'} subtitle={'View and analyse what we have.'} image={titleicon2} />

                {/* <CustomDataGrid /> */}
                <LowStockProducts />
            </div>
        </>
    )
}

export default Home;