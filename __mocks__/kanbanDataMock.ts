import { IKanbanBoardDataPayload } from '@/lib/api/api-types';

/**
 * mock file defining returned data from API GET /kanban
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 */
const kanbanDataMock: IKanbanBoardDataPayload = {
  boards: [
    {
      name: 'Platform Launch',
      isActive: false,
      columns: [
        {
          id: '1f8d6180-6465-4790-8d9c-66106f57970f',
          name: 'Todo',
          tasks: [
            {
              title: 'Build UI for onboarding flow',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  title: 'Sign up page',
                  isCompleted: true,
                  id: 'a53e10ce-27bc-4c19-b130-e4fed985b20e',
                },
                {
                  title: 'Sign in page',
                  isCompleted: false,
                  id: '124ff237-9841-4ffa-ac31-9995afa364b3',
                },
                {
                  title: 'Welcome page',
                  isCompleted: false,
                  id: '01566132-4657-42ce-ba81-1d04ac8c9c24',
                },
              ],
            },
            {
              title: 'Build UI for search',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  title: 'Search page',
                  isCompleted: false,
                  id: '1a68154d-a023-4c49-af35-0a223883ce97',
                },
              ],
            },
            {
              title: 'Build settings UI',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  title: 'Account page',
                  isCompleted: false,
                  id: '90da75f0-ca09-4759-abbb-60b1bd8efa76',
                },
                {
                  title: 'Billing page',
                  isCompleted: false,
                  id: 'fdc1adfd-65da-4c26-a10a-6651f17849df',
                },
              ],
            },
            {
              title: 'QA and test all major user journeys',
              description:
                'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
              status: 'Todo',
              subtasks: [
                {
                  title: 'Internal testing',
                  isCompleted: false,
                  id: '109e51fe-4e98-4f25-865f-eee63b3fdb4f',
                },
                {
                  title: 'External testing',
                  isCompleted: false,
                  id: '5357aa5b-bfb4-41ce-97d3-98cf6798b6e6',
                },
              ],
            },
          ],
        },
        {
          id: 'b80b1cc7-1b00-494e-a3fe-4ad132945998',
          name: 'In Progress',
          tasks: [
            {
              title: 'Design settings and search pages',
              description: '',
              status: 'In Progress',
              subtasks: [
                {
                  title: 'Settings - Account page',
                  isCompleted: true,
                  id: '6e1080d8-eb30-4800-ac82-c25d7f4c4180',
                },
                {
                  title: 'Settings - Billing page',
                  isCompleted: true,
                  id: 'dd3de1cf-1d86-445c-9300-821dc761cb36',
                },
                {
                  title: 'Search page',
                  isCompleted: false,
                  id: '1f95e417-6ab2-4800-826e-0cdfa83614e6',
                },
              ],
            },
            {
              title: 'Add account management endpoints',
              description: '',
              status: 'In Progress',
              subtasks: [
                {
                  title: 'Upgrade plan',
                  isCompleted: true,
                  id: '91b8d499-50cb-4efd-bc35-1c579b01de85',
                },
                {
                  title: 'Cancel plan',
                  isCompleted: true,
                  id: '6c870bf5-3b71-4471-937f-8ffd63e0f489',
                },
                {
                  title: 'Update payment method',
                  isCompleted: false,
                  id: '76e15b7f-741c-40f5-abed-1ec736a9cf23',
                },
              ],
            },
            {
              title: 'Design onboarding flow',
              description: '',
              status: 'In Progress',
              subtasks: [
                {
                  title: 'Sign up page',
                  isCompleted: true,
                  id: 'e391339a-ffee-41ce-a89a-9e9bbacc9f9e',
                },
                {
                  title: 'Sign in page',
                  isCompleted: false,
                  id: '5dc51687-d49f-4808-b2a2-000fb68dffe2',
                },
                {
                  title: 'Welcome page',
                  isCompleted: false,
                  id: 'b0a4b8cf-bb2f-436f-a6ba-11c540c7230d',
                },
              ],
            },
            {
              title: 'Add search enpoints',
              description: '',
              status: 'In Progress',
              subtasks: [
                {
                  title: 'Add search endpoint',
                  isCompleted: true,
                  id: '08c4190e-fe27-43be-a1ad-56e587950a3c',
                },
                {
                  title: 'Define search filters',
                  isCompleted: false,
                  id: 'e4b6f796-ddaf-421b-aaf0-8b0cf767190a',
                },
              ],
            },
            {
              title: 'Add authentication endpoints',
              description: '',
              status: 'In Progress',
              subtasks: [
                {
                  title: 'Define user model',
                  isCompleted: true,
                  id: '65856763-56d2-4a94-9933-cbf487f6f6db',
                },
                {
                  title: 'Add auth endpoints',
                  isCompleted: false,
                  id: 'ff020c3f-efde-4367-8146-11f6cbbcdfe7',
                },
              ],
            },
            {
              title:
                'Research pricing points of various competitors and trial different business models',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              status: 'In Progress',
              subtasks: [
                {
                  title: 'Research competitor pricing and business models',
                  isCompleted: true,
                  id: 'f506682e-4c53-4e13-b141-bccacee3b735',
                },
                {
                  title: 'Outline a business model that works for our solution',
                  isCompleted: false,
                  id: '0c015fb7-05c0-4fa1-84d0-9e0b04fe80ac',
                },
                {
                  title:
                    'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                  isCompleted: false,
                  id: 'f6e3e28a-b693-4d2a-889e-3ed75a5c53b6',
                },
              ],
            },
          ],
        },
        {
          id: '80be6aa2-a403-4e27-a7e5-2ce880f21355',
          name: 'Completed',
          tasks: [
            {
              title: 'Conduct 5 wireframe tests',
              description:
                'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
              status: 'Completed',
              subtasks: [
                {
                  title: 'Complete 5 wireframe prototype tests',
                  isCompleted: true,
                  id: '74299365-a377-4716-910d-9913266fe113',
                },
              ],
            },
            {
              title: 'Create wireframe prototype',
              description:
                'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
              status: 'Completed',
              subtasks: [
                {
                  title: 'Create clickable wireframe prototype in Balsamiq',
                  isCompleted: true,
                  id: 'ef20de59-c51a-4a4d-a7d1-d9f0ee70eaf1',
                },
              ],
            },
            {
              title: 'Review results of usability tests and iterate',
              description:
                "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
              status: 'Completed',
              subtasks: [
                {
                  title:
                    'Meet to review notes from previous tests and plan changes',
                  isCompleted: true,
                  id: 'bf3097f4-8bbf-4e30-9781-c1a84715a274',
                },
                {
                  title: 'Make changes to paper prototypes',
                  isCompleted: true,
                  id: '4ff08372-7162-4e22-aa08-a9617e88bed0',
                },
                {
                  title: 'Conduct 5 usability tests',
                  isCompleted: true,
                  id: '14d791a9-0715-4604-9783-988a6c8b385b',
                },
              ],
            },
            {
              title:
                'Create paper prototypes and conduct 10 usability tests with potential customers',
              description: '',
              status: 'Completed',
              subtasks: [
                {
                  title: 'Create paper prototypes for version one',
                  isCompleted: true,
                  id: 'cdb98bab-7499-44b1-ba43-1ed5e4f0106a',
                },
                {
                  title: 'Complete 10 usability tests',
                  isCompleted: true,
                  id: '2c8340ff-48f3-4829-88ed-69c5f7826fe6',
                },
              ],
            },
            {
              title: 'Market discovery',
              description:
                'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
              status: 'Completed',
              subtasks: [
                {
                  title: 'Interview 10 prospective customers',
                  isCompleted: true,
                  id: '12e88ddd-b369-43e5-96c9-e758b71bdbb2',
                },
              ],
            },
            {
              title: 'Competitor analysis',
              description: '',
              status: 'Completed',
              subtasks: [
                {
                  title: 'Find direct and indirect competitors',
                  isCompleted: true,
                  id: '7c660b10-c14f-41e3-ac8c-d9feefce09fc',
                },
                {
                  title: 'SWOT analysis for each competitor',
                  isCompleted: true,
                  id: 'fc57d2ec-1e27-4d8c-a97f-5f69c6f63c8f',
                },
              ],
            },
            {
              title: 'Research the market',
              description:
                'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
              status: 'Completed',
              subtasks: [
                {
                  title: 'Write up research analysis',
                  isCompleted: true,
                  id: '0031cea3-ed15-4e80-9040-e1370ec74010',
                },
                {
                  title: 'Calculate TAM',
                  isCompleted: true,
                  id: '5177b857-8539-4f63-9dbe-793d6de633b0',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Marketing Plan',
      isActive: false,
      columns: [
        {
          id: 'b7a16b3d-b846-476b-9042-2cfa0b87c39b',
          name: 'Todo',
          tasks: [
            {
              title: 'Plan Product Hunt launch',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  title: 'Find hunter',
                  isCompleted: false,
                  id: 'd92a9688-ad00-4ed8-add4-b3b23d859c41',
                },
                {
                  title: 'Gather assets',
                  isCompleted: false,
                  id: '7e915252-669f-4335-a97e-1d2493cacc27',
                },
                {
                  title: 'Draft product page',
                  isCompleted: false,
                  id: 'd8ba0219-5a64-400f-9c9f-377c6650aab0',
                },
                {
                  title: 'Notify customers',
                  isCompleted: false,
                  id: '49405ef9-b6fc-458c-8004-d3c2a5aa7e0a',
                },
                {
                  title: 'Notify network',
                  isCompleted: false,
                  id: 'b30cde28-efb1-4161-9f8a-14f9fc69f286',
                },
                {
                  title: 'Launch!',
                  isCompleted: false,
                  id: '078f4713-7d4d-4bd8-8014-58d37a4c73f9',
                },
              ],
            },
            {
              title: 'Share on Show HN',
              description: '',
              status: '',
              subtasks: [
                {
                  title: 'Draft out HN post',
                  isCompleted: false,
                  id: '998e22f4-e123-494a-b687-dd6af269cf69',
                },
                {
                  title: 'Get feedback and refine',
                  isCompleted: false,
                  id: '3ef82601-a6d5-4005-944d-c9d9e93e93ee',
                },
                {
                  title: 'Publish post',
                  isCompleted: false,
                  id: 'c5f7c23d-f386-48a6-ab79-7e9cc2eec0a9',
                },
              ],
            },
            {
              title: 'Write launch article to publish on multiple channels',
              description: '',
              status: '',
              subtasks: [
                {
                  title: 'Write article',
                  isCompleted: false,
                  id: '3cf97167-50ae-490f-9251-30276a3adb8e',
                },
                {
                  title: 'Publish on LinkedIn',
                  isCompleted: false,
                  id: 'd75b6e4c-6adf-4186-a33e-021b379a99b0',
                },
                {
                  title: 'Publish on Inndie Hackers',
                  isCompleted: false,
                  id: '18880a6d-8e29-4816-b061-21ed9a11888c',
                },
                {
                  title: 'Publish on Medium',
                  isCompleted: false,
                  id: '78624fa0-52b8-49c5-b96a-248c52353a02',
                },
              ],
            },
          ],
        },
        {
          id: '7cb68845-5d08-458a-b537-ff9e777ab978',
          name: 'In Progress',
          tasks: [],
        },
        {
          id: 'ea0d899c-fefd-4ec5-9aaf-b52b3d45f8f4',
          name: 'Completed',
          tasks: [],
        },
      ],
    },
    {
      name: 'Roadmap',
      isActive: false,
      columns: [
        {
          id: '3eca7f48-7b86-4149-b960-e1109cf7cd00',
          name: 'Now',
          tasks: [
            {
              title: 'Launch version one',
              description: '',
              status: '',
              subtasks: [
                {
                  title: 'Launch privately to our waitlist',
                  isCompleted: false,
                  id: 'd56ca33b-d5c4-4b0b-b5fd-7690a461ba20',
                },
                {
                  title: 'Launch publicly on PH, HN, etc.',
                  isCompleted: false,
                  id: '705e3e79-431b-463f-a8b3-3200e58b4e17',
                },
              ],
            },
            {
              title: 'Review early feedback and plan next steps for roadmap',
              description:
                "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
              status: '',
              subtasks: [
                {
                  title: 'Interview 10 customers',
                  isCompleted: false,
                  id: 'cd579b4f-4d38-49f4-a59f-a11e7fdec93f',
                },
                {
                  title: 'Review common customer pain points and suggestions',
                  isCompleted: false,
                  id: 'c7aee86c-0733-4fcc-bfec-1fd75289355c',
                },
                {
                  title: 'Outline next steps for our roadmap',
                  isCompleted: false,
                  id: 'fd23020e-34b8-46f8-983a-be166a03f68e',
                },
              ],
            },
          ],
        },
        {
          id: '477937ce-6e7a-48cc-b6b1-9dc8a36d8919',
          name: 'Next',
          tasks: [],
        },
        {
          id: '2751ca40-104e-4499-af8f-0bc0a72f80ac',
          name: 'Later',
          tasks: [],
        },
      ],
    },
  ],
};

export default kanbanDataMock;
