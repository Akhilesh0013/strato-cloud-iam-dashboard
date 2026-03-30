package main

var rawUsers = []RawUser{
	{
		Name:            "Foo Bar1",
		CreateDate:      "2020-10-01",
		PasswordChanged: "2021-10-01",
		LastAccess:      "2025-01-04",
		MFAEnabled:      true,
	},
	{
		Name:            "Foo1 Bar1",
		CreateDate:      "2019-09-20",
		PasswordChanged: "2019-09-22",
		LastAccess:      "2025-02-08",
		MFAEnabled:      false,
	},
	{
		Name:            "Foo2 Bar2",
		CreateDate:      "2022-02-03",
		PasswordChanged: "2022-02-03",
		LastAccess:      "2025-02-12",
		MFAEnabled:      false,
	},
	{
		Name:            "Foo3 Bar3",
		CreateDate:      "2023-03-07",
		PasswordChanged: "2023-03-10",
		LastAccess:      "2022-01-03",
		MFAEnabled:      true,
	},
	{
		Name:            "Foo Bar4",
		CreateDate:      "2018-04-08",
		PasswordChanged: "2020-04-12",
		LastAccess:      "2022-10-04",
		MFAEnabled:      false,
	},
	{
		Name:            "Human1",
		CreateDate:      "2018-04-08",
		PasswordChanged: "2025-09-08",
		LastAccess:      "2025-01-03",
		MFAEnabled:      true,
	},
	{
		Name:            "Human2",
		CreateDate:      "2018-04-08",
		PasswordChanged: "2023-09-08",
		LastAccess:      "2025-05-03",
		MFAEnabled:      false,
	},
	{
		Name:            "Human3",
		CreateDate:      "2025-04-08",
		PasswordChanged: "2025-05-08",
		LastAccess:      "", 
		MFAEnabled:      false,
	},
}