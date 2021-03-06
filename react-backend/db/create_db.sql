DROP TABLE IF EXISTS GOALS;
DROP TABLE IF EXISTS BUDDY_POINTS;
DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS COMPLETED_GOALS;


CREATE TABLE USERS(
	fb_uid int,
	name TEXT,
	email TEXT,
	PRIMARY KEY(fb_uid)
);

CREATE TABLE BUDDY_POINTS(
	requester_fb_uid int,
	recipient_fb_uid int,
	point_balance int,
	FOREIGN KEY(requester_fb_uid) references USERS(fb_uid),
	FOREIGN KEY(recipient_fb_uid) references USERS(fb_uid)
);

CREATE TABLE GOALS(
	goal_id int,
	requester_fb_uid int,
	recipient_fb_uid int,
	goal_description TEXT,
	requester_marked_complete int,
	deadline DATE,
	points int,
	reward TEXT,
	FOREIGN KEY(requester_fb_uid) references USERS(fb_uid),
	FOREIGN KEY(recipient_fb_uid) references USERS(fb_uid),
	PRIMARY KEY(goal_id)
);

CREATE TABLE COMPLETED_GOALS(
	goal_id int,
	requester_fb_uid int,
	recipient_fb_uid int,
	goal_description TEXT,
	deadline DATE,
	finished DATE,
	points int,
	reward TEXT,
	FOREIGN KEY(requester_fb_uid) references USERS(fb_uid),
	FOREIGN KEY(recipient_fb_uid) references USERS(fb_uid),
	PRIMARY KEY(goal_id)
);

INSERT INTO GOALS VALUES(1, 10203833289708885, 2, "lose 5 lbs", 0, '2017-07-20', 17, "$20 dinner for 2");
INSERT INTO USERS VALUES(853956344770256, 'Andrew Yuan', 'ayuan@gmail.com');
