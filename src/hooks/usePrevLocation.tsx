import React, { useEffect, useRef } from 'react';
import type { Location, Path, To } from "history";

/**
 * 获取上一个路由的信息
 * @param location
 * @returns
 */
const usePrevLocation = (location: Location) => {
	const prevLocRef = useRef(location);

	useEffect(() => {
		prevLocRef.current = location;
	}, [location]);

	return prevLocRef.current;
};

export default usePrevLocation;
