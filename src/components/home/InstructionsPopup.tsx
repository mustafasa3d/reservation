"use client";

const InstructionsPopup = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const textToCopy = `
    {
      "reservations": [
        {
          "id": "a60f",
          "hotel": "Hotel 3",
          "username": "user3",
          "checkIn": "2025-01-25",
          "checkOut": "2025-02-27",
          "guests": "2",
          "roomType": "Single",
          "status": "pending"
        },
        {
          "id": "cf79",
          "hotel": "Hotel 2",
          "username": "user2",
          "checkIn": "2025-01-25",
          "checkOut": "2025-02-27",
          "guests": "2",
          "roomType": "Single",
          "status": "pending"
        },
        {
          "id": "1bc7",
          "hotel": "Hotel 1",
          "username": "user1",
          "checkIn": "2025-01-25",
          "checkOut": "2025-02-27",
          "guests": "2",
          "roomType": "Single",
          "status": "pending"
        },
        {
          "id": "48d1",
          "hotel": "Hotel 1",
          "checkIn": "2025-01-25",
          "checkOut": "2025-01-31",
          "guests": 1,
          "roomType": "Single",
          "username": "user",
          "status": "pending"
        }
      ],
      "login": [
        {
          "id": "1",
          "username": "admin",
          "password": "admin",
          "role": "admin",
          "token": "admin"
        },
        {
          "id": "2",
          "username": "user",
          "password": "user",
          "role": "user",
          "token": "user"
        },
        {
          "id": "3",
          "username": "user1",
          "password": "user1",
          "role": "user1",
          "token": "user1"
        },
        {
          "id": "3",
          "username": "user2",
          "password": "user2",
          "role": "user2",
          "token": "user2"
        },
        {
          "id": "3",
          "username": "user3",
          "password": "user3",
          "role": "user3",
          "token": "user3"
        }
      ],
      "hotels": [
        {
          "id": "11",
          "name": "Hotel 1"
        },
        {
          "id": "12",
          "name": "Hotel 2"
        },
        {
          "id": "13",
          "name": "Hotel 3"
        }
      ]
    }`;

  const commandToRunServer = `npm run json-server`;

  const commandToRunNextApp = `npm run dev`;

  const handleCopyText = (text: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied Successfully");
      })
      .catch((err) => {
        console.error(
          "copied failed please try again or try to select them and copy manually",
          err
        );
      });
  };

  if (!open) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/95 flex flex-col items-center justify-center px-14 overflow-y-auto">
      <div className="max-h-[90vh] w-full overflow-y-auto">
        <p className="text-white text-2xl mb-5">
          If you encounter any problem please contact me
        </p>

        <div className="border border-blue-700 p-5 rounded-xl my-5">
          <h3 className="mb-5 text-green-500">Admin</h3>
          <div>
            <div className="text-white">user: admin</div>
            <div className="text-white">password: admin</div>
          </div>
          <div className="flex items-center gap-x-5">
            <button
              onClick={() => setOpen(false)}
              className="mt-5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
        
        <div className="border border-blue-700 p-5 rounded-xl mt-5">
          <h3 className="mb-5 text-green-500">Users</h3>
          <div className="border-b border-white pb-2 mb-2">
            <div className="text-white">user: user</div>
            <div className="text-white">password: user</div>
          </div>
          <div className="border-b border-white pb-2 mb-2">
            <div className="text-white">user: user1</div>
            <div className="text-white">password: user1</div>
          </div>
          <div className="border-b border-white pb-2 mb-2">
            <div className="text-white">user: user2</div>
            <div className="text-white">password: user2</div>
          </div>
          <div className="border-b border-white pb-2 mb-2">
            <div className="text-white">user: user3</div>
            <div className="text-white">password: user3</div>
          </div>
          <div className="flex items-center gap-x-5">
            <button
              onClick={() => setOpen(false)}
              className="mt-5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>

       

        <h2 className="mb-5 mt-32 text-2xl">
          If you want run this project locally download it from github then
        </h2>
        <div className="border border-blue-700 p-5 rounded-xl">
          <h3 className="mb-5 text-green-500">Step 1 : init file db.json</h3>
          <div>
            <div className="text-white">{textToCopy}</div>
          </div>
          <div className="flex items-center gap-x-5">
            <button
              onClick={() => handleCopyText(textToCopy)}
              className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Copy
            </button>
            <button
              onClick={() => setOpen(false)}
              className="mt-5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="border border-blue-700 p-5 rounded-xl mt-5">
          <h3 className="mb-5 text-green-500">Step 2 : run server</h3>
          <div>
            <div className="text-white">{commandToRunServer}</div>
          </div>
          <div className="flex items-center gap-x-5">
            <button
              onClick={() => handleCopyText(commandToRunServer)}
              className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Copy
            </button>
            <button
              onClick={() => setOpen(false)}
              className="mt-5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="border border-blue-700 p-5 rounded-xl mt-5">
          <h3 className="mb-5 text-green-500">Step 3 : run next app</h3>
          <div>
            <div className="text-white">{commandToRunNextApp}</div>
          </div>
          <div className="flex items-center gap-x-5">
            <button
              onClick={() => handleCopyText(commandToRunNextApp)}
              className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Copy
            </button>
            <button
              onClick={() => setOpen(false)}
              className="mt-5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPopup;
