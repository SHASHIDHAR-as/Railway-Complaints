import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';

const ParcelComplaints = (props) => {
	const [complaints, setComplaints] = useState([]);

	useEffect(() => {
		// Fetch complaints when the component mounts
		async function fetchComplaints() {
			try {
				const response = await fetch('https://railwaycomplaints.onrender.com/complaints/parcelcomplaints/getallcomplaints', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'authToken': localStorage.getItem('token')
					}
				});

				if (response.ok) {
					const json = await response.json();
					setComplaints(json);
				} else {
					console.error('Failed to fetch complaints');
				}
			} catch (error) {
				console.error('Error fetching complaints:', error);
			}
		}

		fetchComplaints();
	}, []); // Empty dependency array to run this effect once when the component mounts

	return (
		<>
			<h1>Complaints</h1>
			<Accordion>
				{complaints.map((complaint) => (
					<Accordion.Item key={complaint._id} eventKey={complaint._id}>
						<Accordion.Header>Type: {complaint.type}</Accordion.Header>
						<Accordion.Body>
							<strong>Parcel Number:</strong> {complaint.parcelNumber}
						</Accordion.Body>
						<Accordion.Body>
							<strong>Subtype:</strong> {complaint.subtype}
						</Accordion.Body>
						<Accordion.Body>
							<strong>Description:</strong> {complaint.description}
						</Accordion.Body>
						<Accordion.Body>
							<strong>Timestamp:</strong> {complaint.timestamp}
						</Accordion.Body>
					</Accordion.Item>
				))}
			</Accordion>
		</>
	);
};

export default ParcelComplaints;