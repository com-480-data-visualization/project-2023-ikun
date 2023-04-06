# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Zhaobo Wang| |
| | |
| | |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (7th April, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

- COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University
  - https://github.com/CSSEGISandData/COVID-19
  - This dataset, maintained by Johns Hopkins University, aggregates data from multiple sources related to COVID-19. It provides daily updates on the number of confirmed/active/death cases during the epidemic at the country (and in some cases, state or province) level. The database is of high quality, managed and verified by a team of researchers at Johns Hopkins University. As a widely used resource for policymakers, public health officials, and researchers around the world, it can be directly used for our project without any preprocessing. However, we may need to perform operations such as summing the number of cases or calculating the sum within a sliding time window based on our needs for visualization.

- Google Global Community Mobility Reports
  - https://www.google.com/covid19/mobility/
  - This dataset was publicly released by Google to track people's activities during the epidemic in places such as workplaces, pharmacies, stores, public transportation, and residences. It was created to help public health officials and researchers gain a better understanding of how the pandemic and COVID-19-related policies have impacted people's mobility. The database is derived from raw geolocation data owned by Google and has been processed to a high level of usability. It is not anticipated that any pre-processing or data-washing will be required for this dataset.


<!-- > Find a dataset (or multiple) that you will explore. Assess the quality of the data it contains and how much preprocessing / data-cleaning it will require before tackling visualization. We recommend using a standard dataset as this course is not about scraping nor data processing.
>
> Hint: some good pointers for finding quality publicly available datasets ([Google dataset search](https://datasetsearch.research.google.com/), [Kaggle](https://www.kaggle.com/datasets), [OpenSwissData](https://opendata.swiss/en/), [SNAP](https://snap.stanford.edu/data/) and [FiveThirtyEight](https://data.fivethirtyeight.com/)), you could use also the DataSets proposed by the ENAC (see the Announcements section on Zulip).
 -->
### Problematic

We plan to implement a data visualization that demonstrates the relationship between population mobility and the spread of COVID-19 on a global scale. The visualization will contain multiple layers of heat maps, showing the relative change in mobility patterns over time. We will overlay the heat maps with data on the number of confirmed/active cases and deaths from COVID-19. To allow users to explore the data, we will provide a timeline slider that enables them to select different time periods for display. By examining changes in mobility patterns over time, users can identify potential correlations between these patterns and the implementation of specific policies, such as stay-at-home orders or capacity restrictions. This information can help determine whether the policies were effective in reducing population mobility and slowing the spread of the virus. If we can find a suitable database, we will also add information about COVID-19-related policies for different regions at different times to the map.

Our data visualization can provide valuable insights into this unprecedented global health event for various users through retrospective studies. Our target audience includes:
  - Public health officials and policymakers who can study their past decisions about public health policies and interventions and make informed decisions in the future using our data visualization.
  - Researchers and analysts who can use our data visualization to identify interesting patterns and trends, and perform further in-depth studies.
  - General public who are interested in seeing how people's lives have been affected from a collective perspective.


<!-- > Frame the general topic of your visualization and the main axis that you want to develop.
> - What am I trying to show with my visualization?
> - Think of an overview for the project, your motivation, and the target audience.
 -->
### Exploratory Data Analysis
- COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University
  - headers

    | Country/Region | Province/State | County | FIPS | Date | Case_Type | Cases | Long | Lat | SO3166-1 | ISO3166-2 | Difference | Last_Update_Date | Last_Reported_Flag |
    | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
    |Afghanistan|	NaN|	NaN|	NaN|	2020-01-22 00:00:00.000000|	Confirmed|	0|	65.0|	33.0|	AF|	NaN|	NaN|	2023-03-23 15:02:04.173620|	False|
    |Afghanistan|	NaN|	NaN|	NaN|	2020-02-24 00:00:00.000000|	Confirmed|	1|	65.0|	33.0|	AF|	NaN|	1.0|	2023-03-23 15:02:04.173620|	False|

  - There are 14 variables in total with 8 categorical, 5 numerical, and 1 boolean.

    Country / Province / County / FIPS / SO3166-1 / ISO3166-2 are variables for location, and, as the dataset focus more on the U.S. area, most of them are missing for other countires.

    Date is range from 2020-01-22 to 2023-03-08.

    Case_type is categorical data in ['Confirmed', 'Deaths', 'Recovered', 'Active'] and Cases is the number of it.

    Long and Lat are geolocation of each places, which can be used in map visualizations.

    The rest three variables is related with the Covid case, so it is not our concern.

- Google Global Community Mobility Reports
  - headers

    |country_region|	PROVINCE_STATE|	ISO_3166_1|	ISO_3166_2|	date| grocery_and_pharmacy_change_perc|	parks_change_perc|	residential_change_perc|	retail_and_recreation_change_perc|	transit_stations_change_perc|	workplaces_change_perc|	Last_Update_Date|	Last_Reported_Flag|	sub_region_2|
    |--|	--|	--|	--|	--| --|	--|	--|	--|	--|	--|	--|	--|	--|
    |United Arab Emirates|	NaN|	AE|	NaN|	2020-02-15 00:00:00.000000|	4.0|	5.0|	1.0|	0.0|	0.0|	2.0|	2023-04-06 00:04:15.361988|	False|	NaN|
    |United Arab Emirates|	NaN|	AE|	NaN|	2020-02-16 00:00:00.000000|	4.0|	4.0|	1.0|	1.0|	1.0|	2.0|	2023-04-06 00:04:15.361988|	False|	NaN|

  - There are 14 variables in total with 7 categorical, 6 numerical, and 1 boolean.

    country_region / PROVINCE_STATE /	ISO_3166_1 /	ISO_3166_2 are same as the casa dataset, which is the location information.

    date is range from 2020-02-15 to 2022-10-15.

    The rest is the percentage representing the change of population mobility.

- Therefore, as we want to draw a comprehensive global visualization, it is necessary for us to aggregates the U.S. data of the case dataset. Moreover, the time range of two dataset is also unmatched, and we need to truncate them into same range for further analysis.






<!-- > Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data
 -->
### Related work


> - What others have already done with the data?
> - Why is your approach original?
> - What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).
> - In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.

## Milestone 2 (5th May, 5pm)

**10% of the final grade**


## Milestone 3 (2nd June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone
