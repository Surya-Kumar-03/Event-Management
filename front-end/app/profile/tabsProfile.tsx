import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Image from 'next/image';
import ProfileCards from './profileCards';
import useEffect from '../useEffect';
import API from '../API';
import Paginator from '../pagination';
import {
	InterfaceCompletedRegisteredEvent,
	InterfaceEventProgress,
	InterfacePaginatedData,
} from '../datainterface';

const axios = new API.Axios();
// TODO fetch the application status of students in this way
const rows = [
	{
		title: 'Madhugai - The Strength',
		applicationStatus: 'Pending',
		pk: '5',
		club: 'Google Developers Student Club',
		eventStatus: 'Pending',
	},
	{
		title: 'Testing Event 5',
		applicationStatus: 'Rejected',
		pk: '5',
		club: 'ACM - SIST',
		eventStatus: 'Pending',
	},
	{
		title: 'Event 3',
		applicationStatus: 'Accepted',
		pk: '5',
		club: 'Student Development Cell',
		eventStatus: 'Pending',
	},
	{
		title: 'Event 4',
		applicationStatus: 'Pending',
		pk: '5',
		club: 'Microsoft Club - Sathyabama',
		eventStatus: 'Pending',
	},
	{
		title: 'Event 5',
		applicationStatus: 'Completed',
		pk: '5',
		club: 'Community Development Club',
		eventStatus: 'Pending',
	},
	{
		title: 'Event 5',
		applicationStatus: 'Certified',
		pk: '5',
		club: 'Development Club',
		eventStatus: 'Pending',
	},
];

// TODO Fetch Event Status in this way
// used 0 based indexing
const organiser = [
	{
		title: 'Madhugai - The Strength',
		eventStatus: 'canceled',
		pk: '/details/5',
		club: 'Google Developers Student Club',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem debitis fuga beatae vero quaerat! Minima impedit nulla magni molestiae iusto consectetur porro ea aliquid quis reiciendis natus provident laudantium, doloremque eos aspernatur delectus ratione facere expedita fuga quam dignissimos debitis. Assumenda fugiat ipsa optio cum incidunt ducimus perferendis velit officia.',
		// zero based indexing
		status: 0, //indicated last successfully completed step
		failed: -1, // set -1 indicated no rejection till now //else place step where rejection
		failedLabel: 'Please reiterate your event',
	},
	{
		title: 'Testing Event 5',
		eventStatus: 'canceled',
		pk: '/details/5',
		club: 'ACM - SIST',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem debitis fuga beatae vero quaerat! Minima impedit nulla magni molestiae iusto consectetur porro ea aliquid quis reiciendis natus provident laudantium, doloremque eos aspernatur delectus ratione facere expedita fuga quam dignissimos debitis. Assumenda fugiat ipsa optio cum incidunt ducimus perferendis velit officia.',
		status: 4,
		failed: 6,
		failedLabel: 'Set Total <p/> Strength Set Venue Set Date and Time',
	},
	{
		title: 'Event 3',
		eventStatus: 'Accepted',
		pk: '/details/5',
		club: 'Student Development Cell',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem debitis fuga beatae vero quaerat! Minima impedit nulla magni molestiae iusto consectetur porro ea aliquid quis reiciendis natus provident laudantium, doloremque eos aspernatur delectus ratione facere expedita fuga quam dignissimos debitis. Assumenda fugiat ipsa optio cum incidunt ducimus perferendis velit officia.',
		status: 4,
		failed: 4,
		failedLabel:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem debitis fuga beatae vero quaerat! Minima impedit nulla magni molestiae iusto consectetur porro ea aliquid quis reiciendis natus provident laudantium, doloremque eos aspernatur delectus ratione facere expedita fuga quam dignissimos debitis. Assumenda fugiat ipsa optio cum incidunt ducimus perferendis velit officia.',
	},
	{
		title: 'Event 4',
		eventStatus: 'Pending',
		pk: '/details/5',
		club: 'Microsoft Club - Sathyabama',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem debitis fuga beatae vero quaerat! Minima impedit nulla magni molestiae iusto consectetur porro ea aliquid quis reiciendis natus provident laudantium, doloremque eos aspernatur delectus ratione facere expedita fuga quam dignissimos debitis. Assumenda fugiat ipsa optio cum incidunt ducimus perferendis velit officia.',
		status: 6,
		failed: -1,
		failedLabel: '',
	},
	{
		title: 'Event 5',
		eventStatus: 'Completed',
		pk: '/details/5',
		club: 'Community Development Club',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem debitis fuga beatae vero quaerat! Minima impedit nulla magni molestiae iusto consectetur porro ea aliquid quis reiciendis natus provident laudantium, doloremque eos aspernatur delectus ratione facere expedita fuga quam dignissimos debitis. Assumenda fugiat ipsa optio cum incidunt ducimus perferendis velit officia.',
		status: 7,
		failed: 6,
		failedLabel: 'Please reiterate your event',
	},
	{
		title: 'Event 5',
		eventStatus: 'Certified',
		pk: '/details/5',
		club: 'Development Club',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem debitis fuga beatae vero quaerat! Minima impedit nulla magni molestiae iusto consectetur porro ea aliquid quis reiciendis natus provident laudantium, doloremque eos aspernatur delectus ratione facere expedita fuga quam dignissimos debitis. Assumenda fugiat ipsa optio cum incidunt ducimus perferendis velit officia.',
		status: 5,
		failed: 5,
		failedLabel: 'Please reiterate your event',
	},
];

function TabPanel(props: any) {
	const {children, value, index, ...other} = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}>
			{value === index && (
				<div className="flex flex-col gap-2 w-full items-center justify-center">
					{children}
				</div>
			)}
		</div>
	);
}

function Student() {
	const [value, setValue] = React.useState(0);
	const [cards, setCards] = React.useState([]);
	const [registeredEvent, setRegisteredEvent] =
		React.useState<InterfaceCompletedRegisteredEvent>();
	const [completedEvent, setCompletedEvent] =
		React.useState<InterfaceCompletedRegisteredEvent>();
	const [organizedEvent, setOrganizedEvent] =
		React.useState<InterfaceEventProgress>();

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	const [Loader1, setLoader1] = React.useState(0);
	const [Loader2, setLoader2] = React.useState(0);
	const [Loader3, setLoader3] = React.useState(0);
	const [registeredPageNo, setRegisteredPageNo] = React.useState(1);
	const [completedPageNo, setCompletedPageNo] = React.useState(1);
	const [organizingPageNo, setOrganizingPageNo] = React.useState(1);
	const runOnce = true;
	useEffect(
		() => {
			const query = window.setTimeout(async () => {
				const response = await axios.get(API.get_url('event:registered'), {
					page: registeredPageNo,
				});
				const data: InterfacePaginatedData = response.data;
				setRegisteredEvent({
					pageNo: registeredPageNo,
					totalPageNo: data.total_pages,
					data: response.data.results,
					setPageNo: setRegisteredPageNo,
				});
				console.log('registered: ', data, 'Pageno: ', registeredPageNo);
			});
			return () => {
				window.clearInterval(query);
			};
		},
		[registeredPageNo],
		setLoader1
	);
	useEffect(
		() => {
			const query = window.setTimeout(async () => {
				const response = await axios.get(API.get_url('event:completed'), {
					page: completedPageNo,
				});
				const data: InterfacePaginatedData = response.data;
				setCompletedEvent({
					pageNo: completedPageNo,
					totalPageNo: data.total_pages,
					data: response.data.results,
					setPageNo: setCompletedPageNo,
				});
				console.log('Completed: ', data);
			});
			return () => {
				window.clearInterval(query);
			};
		},
		[completedPageNo],
		setLoader2
	);

	useEffect(
		() => {
			const query = window.setTimeout(async () => {
				const response = await axios.get(API.get_url('event:organizing'), {
					page: organizingPageNo,
				});
				const data: InterfacePaginatedData = response.data;
				setOrganizedEvent({
					pageNo: organizingPageNo,
					totalPageNo: data.total_pages,
					data: response.data.results,
					setPageNo: setOrganizingPageNo,
				});
				console.log('registered: ', data, 'Pageno: ', organizingPageNo);
			});
			return () => {
				window.clearInterval(query);
			};
		},
		[organizingPageNo],
		setLoader3
	);
	return (
		<div className="flex flex-col w-full sm:items-center">
			<Tabs
				value={value}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="auto"
				aria-label="scrollable auto tabs example">
				<Tab
					label={
						<div className="flex flex-col md:flex-row md:gap-2 justify-center items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
								/>
							</svg>
							<h1 className="text-lg" style={{textTransform: 'none'}}>
								Registered
							</h1>
						</div>
					}
				/>
				<Tab
					label={
						<div className="flex flex-col md:flex-row md:gap-2 justify-center items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
								/>
							</svg>
							<h1 className="text-lg" style={{textTransform: 'none'}}>
								Completed
							</h1>
						</div>
					}
				/>
				<Tab
					label={
						<div className="flex flex-col md:flex-row md:gap-2 justify-center items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
								/>
							</svg>
							<h1 className="text-lg" style={{textTransform: 'none'}}>
								Organising
							</h1>
						</div>
					}
				/>
			</Tabs>
			<div className="w-full pt-3 border-t border-gray-300">
				<TabPanel value={value} index={0}>
					{/* Events which the student has opted-in to participate. (Will contain pending
					for approval, accepted) */}
					{registeredEvent !== undefined && registeredEvent.data.length > 0 ? (
						registeredEvent.data.map((event) => {
							return (
								<ProfileCards
									title={event.title}
									club={event.club}
									pk={event.pk}
									applicationStatus={event.applicationStatus}
									eventStatus={event.eventStatus}
								/>
							);
						})
					) : (
						<div className="flex flex-col w-full py-4 sm:py-0 sm:min-h-[68vh] items-center justify-center">
							<Image
								src="/noData.svg"
								width={500}
								height={500}
								alt="No Data"></Image>
							<p className="text-lg font-normal text-[#1976d2] -mt-4">
								No registered events.
							</p>
						</div>
					)}
					{registeredEvent !== undefined && (
						<Paginator
							pageNo={registeredEvent.pageNo}
							totalPage={registeredEvent.totalPageNo}
							setPageNo={registeredEvent.setPageNo}
						/>
					)}
				</TabPanel>
				<TabPanel value={value} index={1}>
					{/* Events which the student has opted-in and has completed. */}
					{completedEvent !== undefined && completedEvent.data.length > 0 ? (
						completedEvent.data.map((event) => {
							return (
								<ProfileCards
									title={event.title}
									club={event.club}
									pk={event.pk}
									applicationStatus={event.applicationStatus}
									eventStatus={event.eventStatus}
								/>
							);
						})
					) : (
						<div className="flex flex-col w-full py-4 sm:py-0 sm:min-h-[68vh] items-center justify-center">
							<Image
								src="/noData.svg"
								width={500}
								height={500}
								alt="No Data"></Image>
							<p className="text-lg font-normal text-[#1976d2] -mt-4">
								No completed events.
							</p>
						</div>
					)}
					{completedEvent !== undefined && (
						<Paginator
							pageNo={completedEvent.pageNo}
							totalPage={completedEvent.totalPageNo}
							setPageNo={completedEvent.setPageNo}
						/>
					)}
				</TabPanel>
				<TabPanel value={value} index={2}>
					{/* Events which the student is organising i.e. Student Coordinator */}
					{organizedEvent !== undefined && organizedEvent.data.length > 0 ? (
						organizedEvent.data.map((event) => {
							return (
								<ProfileCards
									variant="organiser"
									current={event.status}
									title={event.title}
									club={event.club}
									pk={event.pk}
									eventStatus={event.eventStatus}
									description={event.description}
									failed={event.failed}
									failedLabel={event.failedLabel}
								/>
							);
						})
					) : (
						<div className="flex flex-col w-full py-4 sm:py-0 sm:min-h-[68vh] items-center justify-center">
							<Image
								src="/noData.svg"
								width={500}
								height={500}
								alt="No Data"></Image>
							<p className="text-lg font-normal text-[#1976d2] -mt-4">
								No organising events.
							</p>
						</div>
					)}
				</TabPanel>
			</div>
		</div>
	);
}

function TeacherHODVC() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div className="flex flex-col w-full sm:items-center">
			<Tabs
				value={value}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="auto"
				aria-label="scrollable auto tabs example">
				<Tab
					label={
						<div className="flex flex-col md:flex-row md:gap-2 justify-center items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
								/>
							</svg>
							<h1 className="text-lg" style={{textTransform: 'none'}}>
								Pending for Approval
							</h1>
						</div>
					}
				/>
				<Tab
					label={
						<div className="flex flex-col md:flex-row md:gap-2 justify-center items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
								/>
							</svg>
							<h1 className="text-lg" style={{textTransform: 'none'}}>
								Organising
							</h1>
						</div>
					}
				/>
				<Tab
					label={
						<div className="flex flex-col md:flex-row md:gap-2 justify-center items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
								/>
							</svg>
							<h1 className="text-lg" style={{textTransform: 'none'}}>
								Completed
							</h1>
						</div>
					}
				/>
			</Tabs>
			<div className="w-full pt-3 border-t border-gray-300">
				<TabPanel value={value} index={0}>
					{/* Events which are organised by the teacher and pending for approval. */}
					<div className="flex flex-col w-full py-4 sm:py-0 sm:min-h-[68vh] items-center justify-center">
						<Image src="/noData.svg" width={500} height={500} alt="No Data"></Image>
						<p className="text-lg font-normal text-[#1976d2] -mt-4">
							No events pending for approval.
						</p>
					</div>
				</TabPanel>
				<TabPanel value={value} index={1}>
					{/* Events which are organised by the teacher and shown to the students. */}
					<div className="flex flex-col w-full py-4 sm:py-0 sm:min-h-[68vh] items-center justify-center">
						<Image src="/noData.svg" width={500} height={500} alt="No Data"></Image>
						<p className="text-lg font-normal text-[#1976d2] -mt-4">
							No organising events.
						</p>
					</div>
				</TabPanel>
				<TabPanel value={value} index={2}>
					{/* Events which are organised by the teacher and are completed. */}
					<div className="flex flex-col w-full py-4 sm:py-0 sm:min-h-[68vh] items-center justify-center">
						<Image src="/noData.svg" width={500} height={500} alt="No Data"></Image>
						<p className="text-lg font-normal text-[#1976d2] -mt-4">
							No completed events.
						</p>
					</div>
				</TabPanel>
			</div>
		</div>
	);
}

const TabsProfile = {
	Student: Student,
	TeacherHODVC: TeacherHODVC,
};

export default TabsProfile;
