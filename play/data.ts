let data =
    profile:
        coverPic: 'assets/sunflowers.jpg',
        profilePic: 'assets/profile_pic.jpg',
        name: 'Noj Vek',
        blurb: 'I hand craft aesthetic applications'

    experiences: [>
        {>
            companyName: 'Microsoft'
            companyUrl: 'http://microsoft.com'
            companyLogo: 'assets/microsoft_logo.png'
            position: 'Software Engineer'
            location: 'Vancouver, Canada & Seattle, United States'
            duration: 'May 2010 - Present'
            projects: [>
                {>
                    video_url: '3Av_I7UZrTY'
                    desc: [>
                        'Working with Microsoft Power BI (Business Intelligence) team to develop the next generation of toolset for Big Data and Analytics.'
                        'Developed authoring features and report editor. Worked on build systems and got a good grasp of how software with millions of lines of code is managed.'
                        'Technologies: Typescript / CSS3 / HTML5 for frontend and C++ on the backend. '
        {>
            companyName: 'Rocketboots'
            companyUrl: 'http://rocketboots.com'
            companyLogo: 'assets/rocketboots_logo.png'
            position: 'Software Engineer'
            location: 'Sydney, Australia'
            duration: 'Mar 2009 - Dec 2013'
            projects: [>
                {>
                    video_url: 'BEba5iVmlEQ'
                    desc: [>
                        'RocketBoots is a software consultancy firm that provides technology solutions to a growing list of blue chip companies. RocketBoots has expertise in  web, desktop, mobile and embedded solutions.'
                        'Currently at 13 employees and experiencing a fast growth, I joined as employee #1.'

        {>
            companyName: 'Smart Sparrow'
            companyUrl: 'http://smartsparrow.com'
            companyLogo: 'assets/smart_sparrow_logo.png'
            position: 'Junior Software Engineer'
            location: 'Sydney, Australia'
            duration: 'Jul 2008 - Jan 2009'
            projects: [>
                {>
                    video_url: 'BEba5iVmlEQ'
                    desc: [>
                        'RocketBoots is a software consultancy firm that provides technology solutions to a growing list of blue chip companies. RocketBoots has expertise in  web, desktop, mobile and embedded solutions.'
                        'Currently at 13 employees and experiencing a fast growth, I joined as employee #1.'
        {>
            companyName: 'University of New South Wales'
            companyUrl: 'http://unsw.edu.au'
            companyLogo: 'assets/unsw_logo.png'
            position: 'Academic Tutor'
            location: 'Sydney, Australia'
            duration: 'Mar 2007 - Jan 2009'
            projects: [>
                {>
                    video_url: 'BEba5iVmlEQ'
                    desc: [>
                        'Awarded highest achieving student in \'Computing for Engineers\' in 1 st year.'
                        'Applied for opportunity to tutor 1st year Engineering students and introduce them to programming and problem solving.'

    education:
        institution_name: 'Univserity of New South Wales (UNSW)'
        institution_url: 'http://unsw.edu.au'
        degree: 'Bsc Computer Science'
        duration: 'July 2006 - Aug 2009'
        courses: [>
            'Computing for Engineers'
            'Data Structures & Algorithms'
            'Discrete Mathematics'
            'Microprocessors & Embedded Systems'
            'Database Systems & Implementation'
            '(Advanced) Computer Graphics'
            'Artificial Intelligence'
            'Language Design & Compilers'
            'Operating Systems'
            'Networks & Distributed Systems'

    skills: [>
        {> skill: 'Java', level: 'Expert'
        {> skill: 'HTML/CSS', level: 'Expert'
        {> skill: 'Javascript', level: 'Expert'
        {> skill: 'PHP', level: 'Expert'
        {> skill: 'Python', level: 'Expert'
        {> skill: 'Linux Bash', level: 'Expert'
        {> skill: 'Adobe Flash / Flex', level: 'Expert'
        {> skill: 'C++', level: 'Intermediate'
        {> skill: 'Obj-C', level: 'Intermediate'

    achievements: [>
        'Startup Weekend Vancouver 2013 – 1st Position'
        'ACM Programming Competition 2008 (Participant), 2009 (2nd Group Position)'
        'Google Code Jam 2009 regional winner'
        'Nvidia Killer Kernel Contest 2009 – 1st Position'
        'CSE-UNSW “Beta“ newsletter editor'
        'Invigilator for High School RoboCup competition at UNSW'
        'Speaker at WebDU Conference (Australia).'
        'Volunteer for Vancouver’s largest tech conference – GrowConf.'
        'Speaker at Adobe User Group, Google Technology User Group'
        'Developed a crowd voting system that utilises fast fourier transform based tone recognition.'
        'Developed video tutoring portal for university students (Before Coursera and video eLearning was popular)'
        'Developed CSE iLab mobile application that allows university students to view lab, server and classroom'
        'World vision volunteer'
        'Regular blood donor for Red Cross'
        'University Open Day volunteer'

// let render = (data) ->
//     with data
//         -< (>
//             <html>
//                 <head>
//                 <body>
//                     <.nav>
//                     <.intro>
//                         <.bg style={'background-image':`url({profile.cover_pic})`}>
//                         <.profile>
//                             <.profile-pic style={'background-image':`url({profile.cover_pic})`}>
//                             <.iam> I AM
//                             <h1.name> {profile.name}
//                             <p.blurb> {profile.blurb}
//                     <.experiences.container>
//                         <.row>
//                             <h2.col-sm-12> Experience
//                         <.experience>
//                             {> experiences.map(> e ->>
//                                 <.info.row>
//                                     <.col-sm-8>
//                                         <a.company href={e.company_url}> {e.company_name}
//                                         <.position> {e.position} . {e.duration} <br/> {e.location}
//                                 {> e.projects.map(> p ->>
//                                     <.project.row>
//                                         <.video.col-sm-6>
//                                             <iframe src={`https://www.youtube.com/embed/{p.video_url}`} allowfullscreen>
//                                         <.desc.col-sm-6>
//                                             {> p.desc.map(> line ->>
//                                                 <p> {line}

