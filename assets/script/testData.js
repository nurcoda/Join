// Benutzer (user)
// Benutzer (user)
let user = [
   {
      "name": "Frodo Baggins",
      "id": 1,
      "email": "frodo@shire.com",
      "password": "ringBearer1",
      "phone": "1234567890",
      "first_two_letters": "FB",
      "color": "#1F3D7A", // Dunkelblau
   },
   {
      "name": "Samwise Gamgee",
      "id": 2,
      "email": "sam@shire.com",
      "password": "loyalGardener2",
      "phone": "1234567891",
      "first_two_letters": "SG",
      "color": "#4B0082", // Indigo
   },
   {
      "name": "Aragorn Elessar",
      "id": 3,
      "email": "aragorn@gondor.com",
      "password": "kingReturn3",
      "phone": "1234567892",
      "first_two_letters": "AE",
      "color": "#8B0000", // Dunkelrot
   },
   {
      "name": "Legolas Thranduilion",
      "id": 4,
      "email": "legolas@mirkwood.com",
      "password": "elfPrince4",
      "phone": "1234567893",
      "first_two_letters": "LT",
      "color": "#006400", // Dunkelgrün
   },
   {
      "name": "Gandalf Mithrandir",
      "id": 5,
      "email": "gandalf@middleearth.com",
      "password": "wizardGrey5",
      "phone": "1234567894",
      "first_two_letters": "GM",
      "color": "#2F4F4F", // Dunkles Schiefergrau
   },
];

// Kontakte (contacts)
let contacts = [
   {
      "name": "Boromir Denethorion",
      "id": 6,
      "email": "boromir@gondor.com",
      "phone": "1234567895",
      "first_two_letters": "BD",
      "color": "#800000", // Kastanienbraun
   },
   {
      "name": "Gimli Glóin'son",
      "id": 7,
      "email": "gimli@erebor.com",
      "phone": "1234567896",
      "first_two_letters": "GG",
      "color": "#556B2F", // Dunkelolivgrün
   },
   {
      "name": "Saruman Curunír",
      "id": 8,
      "email": "saruman@isengard.com",
      "phone": "1234567897",
      "first_two_letters": "SC",
      "color": "#483D8B", // Dunkles Schieferblau
   },
   {
      "name": "Galadriel Artanis",
      "id": 9,
      "email": "galadriel@lorien.com",
      "phone": "1234567898",
      "first_two_letters": "GA",
      "color": "#800080", // Violett
   },
   {
      "name": "Elrond Peredhel",
      "id": 10,
      "email": "elrond@rivendell.com",
      "phone": "1234567899",
      "first_two_letters": "EP",
      "color": "#2E8B57", // Seegrün
   },
   {
      "name": "Éowyn Dernhelm",
      "id": 11,
      "email": "eowyn@rohan.com",
      "phone": "1234567800",
      "first_two_letters": "ED",
      "color": "#B22222", // Feuerziegelrot
   },
   {
      "name": "Faramir Denethorion",
      "id": 12,
      "email": "faramir@gondor.com",
      "phone": "1234567801",
      "first_two_letters": "FD",
      "color": "#A52A2A", // Braun
   },
   {
      "name": "Meriadoc Brandybuck",
      "id": 13,
      "email": "merry@shire.com",
      "phone": "1234567802",
      "first_two_letters": "MB",
      "color": "#6A5ACD", // Schieferblau
   },
   {
      "name": "Peregrin Took",
      "id": 14,
      "email": "pippin@shire.com",
      "phone": "1234567803",
      "first_two_letters": "PT",
      "color": "#4682B4", // Stahlblau
   },
   {
      "name": "Théoden Ednew",
      "id": 15,
      "email": "theoden@rohan.com",
      "phone": "1234567804",
      "first_two_letters": "TE",
      "color": "#2F4F4F", // Dunkles Schiefergrau
   },
   {
      "name": "Treebeard Fangorn",
      "id": 16,
      "email": "treebeard@fangorn.com",
      "phone": "1234567805",
      "first_two_letters": "TF",
      "color": "#228B22", // Waldgrün
   },
   {
      "name": "Sauron Mairon",
      "id": 17,
      "email": "sauron@mordor.com",
      "phone": "1234567806",
      "first_two_letters": "SM",
      "color": "#B22222", // Feuerziegelrot
   },
   {
      "name": "Gollum Sméagol",
      "id": 18,
      "email": "gollum@mistymountains.com",
      "phone": "1234567807",
      "first_two_letters": "GS",
      "color": "#8B4513", // Sattelbraun
   },
   {
      "name": "Bilbo Baggins",
      "id": 19,
      "email": "bilbo@shire.com",
      "phone": "1234567808",
      "first_two_letters": "BB",
      "color": "#8B008B", // Dunkelmagenta
   },
   {
      "name": "Arwen Undómiel",
      "id": 20,
      "email": "arwen@rivendell.com",
      "phone": "1234567809",
      "first_two_letters": "AU",
      "color": "#9400D3", // Dunkelviolett
   },
];

// Aufgaben (tasks)
let tasks = [
   {
      "name": "Destroy the One Ring",
      "id": 31,
      "description": "Take the One Ring to Mount Doom and destroy it.",
      "category": "User Story",
      "priority": "high",
      "due_date": "19/12/2024",
      "state": "todo",
      "assigned_user": [
         { "name": "Frodo Baggins", "first_two_letters": "FB" },
         { "name": "Samwise Gamgee", "first_two_letters": "SG" },
      ],
      "subtasks": [
         { "subtask_name": "Reach Rivendell", "subtask_isdone": true },
         { "subtask_name": "Pass through Moria", "subtask_isdone": false },
      ],
   },
   {
      "name": "Defend Helm's Deep",
      "id": 32,
      "description": "Defend the fortress of Helm's Deep against Saruman's army.",
      "category": "User Story",
      "priority": "high",
      "due_date": "15/06/2024",
      "state": "inprogress",
      "assigned_user": [
         { "name": "Aragorn Elessar", "first_two_letters": "AE" },
         { "name": "Legolas Thranduilion", "first_two_letters": "LT" },
         { "name": "Gimli Glóin'son", "first_two_letters": "GG" },
      ],
      "subtasks": [
         { "subtask_name": "Rally the troops", "subtask_isdone": true },
         { "subtask_name": "Fortify the walls", "subtask_isdone": true },
      ],
   },
   {
      "name": "Rescue Merry and Pippin",
      "id": 33,
      "description": "Find and rescue Merry and Pippin from the Uruk-hai.",
      "category": "User Story",
      "priority": "medium",
      "due_date": "05/05/2024",
      "state": "done",
      "assigned_user": [
         { "name": "Aragorn Elessar", "first_two_letters": "AE" },
         { "name": "Legolas Thranduilion", "first_two_letters": "LT" },
         { "name": "Gimli Glóin'son", "first_two_letters": "GG" },
      ],
      "subtasks": [
         { "subtask_name": "Track the Uruk-hai", "subtask_isdone": true },
         { "subtask_name": "Engage in combat", "subtask_isdone": true },
      ],
   },
   {
      "name": "Convince the Ents",
      "id": 34,
      "description": "Convince Treebeard and the Ents to join the fight against Saruman.",
      "category": "User Story",
      "priority": "medium",
      "due_date": "01/04/2024",
      "state": "inprogress",
      "assigned_user": [
         { "name": "Meriadoc Brandybuck", "first_two_letters": "MB" },
         { "name": "Peregrin Took", "first_two_letters": "PT" },
      ],
      "subtasks": [
         { "subtask_name": "Find Treebeard", "subtask_isdone": true },
         { "subtask_name": "Attend Entmoot", "subtask_isdone": false },
      ],
   },
   {
      "name": "Frodo's Journey",
      "id": 35,
      "description": "Ensure Frodo safely makes his journey to destroy the One Ring.",
      "category": "Technical Task",
      "priority": "high",
      "due_date": "25/12/2024",
      "state": "todo",
      "assigned_user": [
         { "name": "Samwise Gamgee", "first_two_letters": "SG" },
         { "name": "Frodo Baggins", "first_two_letters": "FB" },
      ],
      "subtasks": [
         { "subtask_name": "Escape the Shire", "subtask_isdone": true },
         { "subtask_name": "Cross the Brandywine River", "subtask_isdone": true },
         { "subtask_name": "Reach Bree", "subtask_isdone": false },
      ],
   },
];
