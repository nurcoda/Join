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
      "name": "Aragorn Aragorn",
      "id": 3,
      "email": "aragorn@gondor.com",
      "password": "kingReturn3",
      "phone": "1234567892",
      "first_two_letters": "AR",
      "color": "#8B0000", // Dunkelrot
   },
   {
      "name": "Legolas Legolas",
      "id": 4,
      "email": "legolas@mirkwood.com",
      "password": "elfPrince4",
      "phone": "1234567893",
      "first_two_letters": "LE",
      "color": "#006400", // Dunkelgrün
   },
   {
      "name": "Gandalf Gandalf",
      "id": 5,
      "email": "gandalf@middleearth.com",
      "password": "wizardGrey5",
      "phone": "1234567894",
      "first_two_letters": "GA",
      "color": "#2F4F4F", // Dunkles Schiefergrau
   },
];

// Kontakte (contacts)
let contacts = [
   {
      "name": "Boromir Boromir",
      "id": 6,
      "email": "boromir@gondor.com",
      "phone": "1234567895",
      "first_two_letters": "BO",
      "color": "#800000", // Kastanienbraun
   },
   {
      "name": "Gimli Gimli",
      "id": 7,
      "email": "gimli@erebor.com",
      "phone": "1234567896",
      "first_two_letters": "GI",
      "color": "#556B2F", // Dunkelolivgrün
   },
   {
      "name": "Saruman Saruman",
      "id": 8,
      "email": "saruman@isengard.com",
      "phone": "1234567897",
      "first_two_letters": "SA",
      "color": "#483D8B", // Dunkles Schieferblau
   },
   {
      "name": "Galadriel Galadriel",
      "id": 9,
      "email": "galadriel@lorien.com",
      "phone": "1234567898",
      "first_two_letters": "GA",
      "color": "#800080", // Violett
   },
   {
      "name": "Elrond Elrond",
      "id": 10,
      "email": "elrond@rivendell.com",
      "phone": "1234567899",
      "first_two_letters": "EL",
      "color": "#2E8B57", // Seegrün
   },
   {
      "name": "Eowyn Eowyn",
      "id": 11,
      "email": "eowyn@rohan.com",
      "phone": "1234567800",
      "first_two_letters": "EO",
      "color": "#B22222", // Feuerziegelrot
   },
   {
      "name": "Faramir Faramir",
      "id": 12,
      "email": "faramir@gondor.com",
      "phone": "1234567801",
      "first_two_letters": "FA",
      "color": "#A52A2A", // Braun
   },
   {
      "name": "Meriadoc Brandybuck",
      "id": 13,
      "email": "merry@shire.com",
      "phone": "1234567802",
      "first_two_letters": "ME",
      "color": "#6A5ACD", // Schieferblau
   },
   {
      "name": "Peregrin Took",
      "id": 14,
      "email": "pippin@shire.com",
      "phone": "1234567803",
      "first_two_letters": "PI",
      "color": "#4682B4", // Stahlblau
   },
   {
      "name": "Théoden Théoden",
      "id": 15,
      "email": "theoden@rohan.com",
      "phone": "1234567804",
      "first_two_letters": "TH",
      "color": "#2F4F4F", // Dunkles Schiefergrau
   },
   {
      "name": "Treebeard Treebeard",
      "id": 16,
      "email": "treebeard@fangorn.com",
      "phone": "1234567805",
      "first_two_letters": "TR",
      "color": "#228B22", // Waldgrün
   },
   {
      "name": "Sauron Sauron",
      "id": 17,
      "email": "sauron@mordor.com",
      "phone": "1234567806",
      "first_two_letters": "SA",
      "color": "#B22222", // Feuerziegelrot
   },
   {
      "name": "Gollum Gollum",
      "id": 18,
      "email": "gollum@mistymountains.com",
      "phone": "1234567807",
      "first_two_letters": "GO",
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
      "name": "Arwen Arwen",
      "id": 20,
      "email": "arwen@rivendell.com",
      "phone": "1234567809",
      "first_two_letters": "AR",
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
         { "name": "Aragorn Aragorn", "first_two_letters": "AR" },
         { "name": "Legolas Legolas", "first_two_letters": "LE" },
         { "name": "Gimli Gimli", "first_two_letters": "GI" },
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
         { "name": "Aragorn Aragorn", "first_two_letters": "AR" },
         { "name": "Legolas Legolas", "first_two_letters": "LE" },
         { "name": "Gimli Gimli", "first_two_letters": "GI" },
      ],
      "subtasks": [
         { "subtask_name": "Track the Uruk-hai", "subtask_isdone": true },
         { "subtask_name": "Rescue Merry and Pippin", "subtask_isdone": true },
      ],
   },
   {
      "name": "Form the Fellowship",
      "id": 34,
      "description": "Create a fellowship to destroy the One Ring.",
      "category": "User Story",
      "priority": "high",
      "due_date": "15/02/2024",
      "state": "done",
      "assigned_user": [
         { "name": "Gandalf Gandalf", "first_two_letters": "GA" },
         { "name": "Elrond Elrond", "first_two_letters": "EL" },
      ],
      "subtasks": [
         { "subtask_name": "Gather members", "subtask_isdone": true },
         { "subtask_name": "Swear oaths", "subtask_isdone": true },
      ],
   },
   {
      "name": "Journey to the Black Gate",
      "id": 35,
      "description": "Distract Sauron's eye by attacking the Black Gate.",
      "category": "User Story",
      "priority": "high",
      "due_date": "15/10/2024",
      "state": "inprogress",
      "assigned_user": [
         { "name": "Aragorn Aragorn", "first_two_letters": "AR" },
         { "name": "Gimli Gimli", "first_two_letters": "GI" },
         { "name": "Legolas Legolas", "first_two_letters": "LE" },
      ],
      "subtasks": [
         { "subtask_name": "Prepare the army", "subtask_isdone": true },
         { "subtask_name": "March to the Black Gate", "subtask_isdone": false },
      ],
   },
   {
      "name": "Reclaim Minas Tirith",
      "id": 36,
      "description": "Defend Minas Tirith from Sauron's forces.",
      "category": "User Story",
      "priority": "high",
      "due_date": "20/08/2024",
      "state": "inprogress",
      "assigned_user": [
         { "name": "Gandalf Gandalf", "first_two_letters": "GA" },
         { "name": "Peregrin Took", "first_two_letters": "PI" },
         { "name": "Faramir Faramir", "first_two_letters": "FA" },
      ],
      "subtasks": [
         { "subtask_name": "Defend the gates", "subtask_isdone": true },
         { "subtask_name": "Protect the citizens", "subtask_isdone": true },
      ],
   },
   {
      "name": "Destroy Isengard",
      "id": 37,
      "description": "Attack Isengard and defeat Saruman.",
      "category": "User Story",
      "priority": "high",
      "due_date": "01/07/2024",
      "state": "done",
      "assigned_user": [
         { "name": "Treebeard Treebeard", "first_two_letters": "TR" },
         { "name": "Meriadoc Brandybuck", "first_two_letters": "ME" },
         { "name": "Peregrin Took", "first_two_letters": "PI" },
      ],
      "subtasks": [
         { "subtask_name": "Rally the Ents", "subtask_isdone": true },
         { "subtask_name": "Destroy the dam", "subtask_isdone": true },
      ],
   },
   {
      "name": "Guide Frodo and Sam",
      "id": 38,
      "description": "Guide Frodo and Sam to Mordor.",
      "category": "User Story",
      "priority": "medium",
      "due_date": "10/09/2024",
      "state": "done",
      "assigned_user": [{ "name": "Gollum Gollum", "first_two_letters": "GO" }],
      "subtasks": [
         { "subtask_name": "Lead through the Dead Marshes", "subtask_isdone": true },
         { "subtask_name": "Avoid capture by Faramir", "subtask_isdone": true },
      ],
   },
   {
      "name": "Heal Théoden",
      "id": 39,
      "description": "Free King Théoden from Saruman's influence.",
      "category": "User Story",
      "priority": "high",
      "due_date": "15/03/2024",
      "state": "done",
      "assigned_user": [{ "name": "Gandalf Gandalf", "first_two_letters": "GA" }],
      "subtasks": [
         { "subtask_name": "Enter Meduseld", "subtask_isdone": true },
         { "subtask_name": "Confront Saruman", "subtask_isdone": true },
      ],
   },
   {
      "name": "Defeat the Balrog",
      "id": 40,
      "description": "Battle and defeat the Balrog in Moria.",
      "category": "User Story",
      "priority": "high",
      "due_date": "05/04/2024",
      "state": "done",
      "assigned_user": [{ "name": "Gandalf Gandalf", "first_two_letters": "GA" }],
      "subtasks": [
         { "subtask_name": "Confront the Balrog", "subtask_isdone": true },
         { "subtask_name": "Battle on the Bridge of Khazad-dûm", "subtask_isdone": true },
      ],
   },
   {
      "name": "Fix Rivendell's Bridge",
      "id": 41,
      "description": "Repair the bridge at Rivendell.",
      "category": "Technical Task",
      "priority": "low",
      "due_date": "01/11/2024",
      "state": "todo",
      "assigned_user": [{ "name": "Elrond Elrond", "first_two_letters": "EL" }],
      "subtasks": [
         { "subtask_name": "Gather materials", "subtask_isdone": false },
         { "subtask_name": "Repair the structure", "subtask_isdone": false },
      ],
   },
   {
      "name": "Upgrade Minas Tirith's Defenses",
      "id": 42,
      "description": "Improve the defensive structures of Minas Tirith.",
      "category": "Technical Task",
      "priority": "medium",
      "due_date": "30/09/2024",
      "state": "inprogress",
      "assigned_user": [{ "name": "Faramir Faramir", "first_two_letters": "FA" }],
      "subtasks": [
         { "subtask_name": "Reinforce walls", "subtask_isdone": true },
         { "subtask_name": "Upgrade gates", "subtask_isdone": false },
      ],
   },
];
