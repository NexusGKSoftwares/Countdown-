import { Card,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react'
import React, { useEffect } from 'react'
import TotalCard from '../../components/TotalCard'
import GroupIcon from '@mui/icons-material/Group';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import RevenueCard from '../../components/RevenueCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { db } from '../../firebase';
import All from './All';
import Ordinary from './Ordinary';
import VIP from './VIP';

function Home() {
  const [totalTickets, setTotalTickets] = React.useState([])
  const [ordinaryTickets, setOrdinaryTickets] = React.useState([])
  const [vipTickets, setVIPTickets] = React.useState([])
  const [agrics, setAgrics] = React.useState([])
  const [arts, setArts] = React.useState([])
  const [add, setAdd] = React.useState([])
  const [business, setBusiness] = React.useState([])
  const [kikuyu, setKikuyu] = React.useState([])
  const [eng, setEng] = React.useState([])
  const [law, setLaw] = React.useState([])
  const [health, setHealth] = React.useState([])
  const [scie, setScie] = React.useState([])
  const [vet, setVet] = React.useState([])
  const [momb, setMomb] = React.useState([])
  const [kenya, setKenya] = React.useState([])
  const [kisumu, setKisumu] = React.useState([])
  const [non, setNon] = React.useState([])





  useEffect(() => {
    // Replace 'http://your-api-url/fetchRegistrationData' with your actual API endpoint
    const fetchData = async() => { 
      
      fetch('https://unsa-feng.uonbi.ac.ke/backend/php/getAll.php')
      .then(response => response.json())
      .then(data => {
        setTotalTickets(data);

        // Calculate the total amount
        // const total = data.reduce((acc, ticket) => acc + ticket.amount, 0);
        // setTotalTicketsRevenue(total);
      })
      .catch(error => {
        console.log(error.message || 'An error occurred while fetching data.');
      });

    }

    const interval = setInterval(fetchData, 2000);

    // Clean up interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);



  useEffect(() => {
    // Replace 'http://your-api-url/fetchAllTickets' with your actual API endpoint
    const fetchData = async() => {
      
      fetch('https://unsa-feng.uonbi.ac.ke/backend/php/getAll.php')
      .then(response => response.json())
      .then(data => {
        // Filter ordinary tickets
        const agricsData = data.filter(ticket => ticket.faculty === 'AGRICULTURE');
        const artsData = data.filter(ticket => ticket.faculty === 'ART & SOCIAL SCIENCES');
        const addData = data.filter(ticket => ticket.faculty === 'BUILT ENVIRONMENT & DESIGN');
        const engData = data.filter(ticket => ticket.faculty === 'ENGINEERING');
        const businessData = data.filter(ticket => ticket.faculty === 'BUSINESS & MANAGEMENT SCIENCES');
        const kikuyuData = data.filter(ticket => ticket.faculty === 'KIKUYU CAMPUS');
        const lawData = data.filter(ticket => ticket.faculty === 'LAW');
        const healthData = data.filter(ticket => ticket.faculty === 'HEALTH SCIENCE');
        const sciData = data.filter(ticket => ticket.faculty === 'SCIENCE & TECHNOLOGY');
        const vetData = data.filter(ticket => ticket.faculty === 'VETENARY MEDICINE');
        const mombData = data.filter(ticket => ticket.faculty === 'MOMBASA CAMPUS');        
        const kenyaData = data.filter(ticket => ticket.faculty === 'KENYA SCIENCE');
        const kisumuData = data.filter(ticket => ticket.faculty === 'KISUMU CAMPUS');
        const nonStudentData = data.filter(ticket => ticket.faculty === 'N/A');
        setAgrics(agricsData);
        setArts(artsData)
        setAdd(addData)
        setEng(engData)
        setBusiness(businessData)
        setKikuyu(kikuyuData)
        setLaw(lawData)
        setHealth(healthData)
        setScie(sciData)
        setVet(vetData)
        setMomb(mombData)
        setKenya(kenyaData)
        setKisumu(kisumuData)
        setNon(nonStudentData)
      })
      .catch(error => {
        console.log(error.message || 'An error occurred while fetching data.');
      });

    }
      const interval = setInterval(fetchData, 2000);

      // Clean up interval on component unmount
      return () => {
        clearInterval(interval);
      };
  }, []);






  return (
    <Card className='home'>
    {/** TotalCards */}
    
      <div className='cards'>
         <TotalCard title='TOTAL REGISTERED TICKETS' number={totalTickets.length} icon={GroupIcon} />
         <TotalCard title='AGRICULTURE' number={agrics.length} icon={GroupIcon} />
         <TotalCard title='ART & SOCIAL SCIENCES' number={arts.length} icon={ConfirmationNumberIcon} />
         <TotalCard title='BUILT ENVIRONMENT & DESIGN' number={add.length} icon={SupervisedUserCircleIcon} />
      </div>
      
      <div className='cards'>
         <TotalCard title='ENGINEERING' number={eng.length} icon={SupervisedUserCircleIcon} />
         <TotalCard title='B. & MANAGEMENT SCIENCES' number={business.length} icon={SupervisedUserCircleIcon} />
         <TotalCard title='KIKUYU CAMPUS' number={kikuyu.length} icon={SupervisedUserCircleIcon} />
         <TotalCard title='LAW' number={law.length} icon={SupervisedUserCircleIcon} />
      </div>

      <div className='cards'>
      <TotalCard title='HEALTH SCIENCE' number={health.length} icon={SupervisedUserCircleIcon} />
      <TotalCard title='SCIENCE & TECHNOLOGY' number={scie.length} icon={SupervisedUserCircleIcon} />
      <TotalCard title='VETENARY MEDICINE' number={vet.length} icon={SupervisedUserCircleIcon} />
      <TotalCard title='MOMBASA CAMPUS' number={momb.length} icon={SupervisedUserCircleIcon} />
   </div>

   <div className='cards'>
   <TotalCard title='KENYA SCIENCE' number={kenya.length} icon={SupervisedUserCircleIcon} />
   <TotalCard title='KISUMU CAMPUS' number={kisumu.length} icon={SupervisedUserCircleIcon} />
   <TotalCard title='NON STUDENTS' number={non.length} icon={SupervisedUserCircleIcon} />
</div>

    {/** Tabs */}
    <Tabs style={{marginTop:15}} id="custom-animation" value={0}>
    <TabsHeader>
    <Tab key={0} value={0}>
    ALL TICKETS
  </Tab>
  <Tab key={1} value={1}>
  ORDINARY
</Tab>
<Tab key={2} value={2}>
VIP
</Tab>
    </TabsHeader>
    <TabsBody
    animate={{
      initial: { y: 250 },
      mount: { y: 0 },
      unmount: { y: 250 },
    }}
    style={{background:'#fff', borderRadius:10}}
    >
    <TabPanel key={0} value={0}>
      <All />
    </TabPanel>
    <TabPanel key={1} value={1}>
    <Ordinary />
  </TabPanel>
  <TabPanel key={2} value={2}>
  <VIP />
</TabPanel>
    </TabsBody>
    </Tabs>
    </Card>
  )
}

export default Home