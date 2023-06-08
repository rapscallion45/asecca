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
                },
                {
                  title: 'Sign in page',
                  isCompleted: false,
                },
                {
                  title: 'Welcome page',
                  isCompleted: false,
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
                },
                {
                  title: 'Billing page',
                  isCompleted: false,
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
                },
                {
                  title: 'External testing',
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: 'b80b1cc7-1b00-494e-a3fe-4ad132945998',
          name: 'Doing',
          tasks: [
            {
              title: 'Design settings and search pages',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  title: 'Settings - Account page',
                  isCompleted: true,
                },
                {
                  title: 'Settings - Billing page',
                  isCompleted: true,
                },
                {
                  title: 'Search page',
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Add account management endpoints',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  title: 'Upgrade plan',
                  isCompleted: true,
                },
                {
                  title: 'Cancel plan',
                  isCompleted: true,
                },
                {
                  title: 'Update payment method',
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Design onboarding flow',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  title: 'Sign up page',
                  isCompleted: true,
                },
                {
                  title: 'Sign in page',
                  isCompleted: false,
                },
                {
                  title: 'Welcome page',
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Add search enpoints',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  title: 'Add search endpoint',
                  isCompleted: true,
                },
                {
                  title: 'Define search filters',
                  isCompleted: false,
                },
              ],
            },
            {
              title: 'Add authentication endpoints',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  title: 'Define user model',
                  isCompleted: true,
                },
                {
                  title: 'Add auth endpoints',
                  isCompleted: false,
                },
              ],
            },
            {
              title:
                'Research pricing points of various competitors and trial different business models',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              status: 'Doing',
              subtasks: [
                {
                  title: 'Research competitor pricing and business models',
                  isCompleted: true,
                },
                {
                  title: 'Outline a business model that works for our solution',
                  isCompleted: false,
                },
                {
                  title:
                    'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: '80be6aa2-a403-4e27-a7e5-2ce880f21355',
          name: 'Done',
          tasks: [
            {
              title: 'Conduct 5 wireframe tests',
              description:
                'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
              status: 'Done',
              subtasks: [
                {
                  title: 'Complete 5 wireframe prototype tests',
                  isCompleted: true,
                },
              ],
            },
            {
              title: 'Create wireframe prototype',
              description:
                'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
              status: 'Done',
              subtasks: [
                {
                  title: 'Create clickable wireframe prototype in Balsamiq',
                  isCompleted: true,
                },
              ],
            },
            {
              title: 'Review results of usability tests and iterate',
              description:
                "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
              status: 'Done',
              subtasks: [
                {
                  title:
                    'Meet to review notes from previous tests and plan changes',
                  isCompleted: true,
                },
                {
                  title: 'Make changes to paper prototypes',
                  isCompleted: true,
                },
                {
                  title: 'Conduct 5 usability tests',
                  isCompleted: true,
                },
              ],
            },
            {
              title:
                'Create paper prototypes and conduct 10 usability tests with potential customers',
              description: '',
              status: 'Done',
              subtasks: [
                {
                  title: 'Create paper prototypes for version one',
                  isCompleted: true,
                },
                {
                  title: 'Complete 10 usability tests',
                  isCompleted: true,
                },
              ],
            },
            {
              title: 'Market discovery',
              description:
                'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
              status: 'Done',
              subtasks: [
                {
                  title: 'Interview 10 prospective customers',
                  isCompleted: true,
                },
              ],
            },
            {
              title: 'Competitor analysis',
              description: '',
              status: 'Done',
              subtasks: [
                {
                  title: 'Find direct and indirect competitors',
                  isCompleted: true,
                },
                {
                  title: 'SWOT analysis for each competitor',
                  isCompleted: true,
                },
              ],
            },
            {
              title: 'Research the market',
              description:
                'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
              status: 'Done',
              subtasks: [
                {
                  title: 'Write up research analysis',
                  isCompleted: true,
                },
                {
                  title: 'Calculate TAM',
                  isCompleted: true,
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
                },
                {
                  title: 'Gather assets',
                  isCompleted: false,
                },
                {
                  title: 'Draft product page',
                  isCompleted: false,
                },
                {
                  title: 'Notify customers',
                  isCompleted: false,
                },
                {
                  title: 'Notify network',
                  isCompleted: false,
                },
                {
                  title: 'Launch!',
                  isCompleted: false,
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
                },
                {
                  title: 'Get feedback and refine',
                  isCompleted: false,
                },
                {
                  title: 'Publish post',
                  isCompleted: false,
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
                },
                {
                  title: 'Publish on LinkedIn',
                  isCompleted: false,
                },
                {
                  title: 'Publish on Inndie Hackers',
                  isCompleted: false,
                },
                {
                  title: 'Publish on Medium',
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: '7cb68845-5d08-458a-b537-ff9e777ab978',
          name: 'Doing',
          tasks: [],
        },
        {
          id: 'ea0d899c-fefd-4ec5-9aaf-b52b3d45f8f4',
          name: 'Done',
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
                },
                {
                  title: 'Launch publicly on PH, HN, etc.',
                  isCompleted: false,
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
                },
                {
                  title: 'Review common customer pain points and suggestions',
                  isCompleted: false,
                },
                {
                  title: 'Outline next steps for our roadmap',
                  isCompleted: false,
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
