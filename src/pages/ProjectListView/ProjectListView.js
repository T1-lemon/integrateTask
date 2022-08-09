import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProjectApi } from '../../redux/actions/ProjectAction';

export default function ProjectListView() {
	const dispatch = useDispatch();

	const { projectId } = useParams();
	useEffect(() => {
		dispatch(getProjectApi(projectId));
	}, [])
	return (
		<div>
			{' '}
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
			<p>ProjectListView</p>
		</div>
	);
}
