import { ConfirmTeamInvitationProps } from "@/components/cards/challenge/ConfirmTeamInvitation";
import { KYCSTATUS } from "@/store/feature/kyc.slice";


export const mockConfirmTeamInvitation : ConfirmTeamInvitationProps = {
    index: 1,
    title: "ConfirmTeamInvitation",
    text: "welcome to our team",
    invite: {
        created_at: "2023-20",
        id : "2",
        ref: "ref-2",
        status: "pending",
        team_ref: "team-blue",
        timestamp:2300,
        updated_at: "23h39",
        user:  {
            id: 'user123',
            ref: 'ref456',
            created_at: new Date('2024-01-01'),
            firstName: 'John',
            displayName: 'JohnnyDoe',
            uid: 'uid789',
            joined: '2024-02-14',
            disabled: false,
            reputation: 100,
            username: 'john_doe',
            lastName: 'Doe',
            emailVerified: true,
            email: 'john.doe@example.com',
            avatar: 'http://example.com/avatar.jpg',
            metadata: {
              reputation: {
                id: 'reputation123',
                total: 150,
                list: ['communityA', 'communityB'],
                community: {
                    id: 'community123',
                    ref: 'ref456',
                    created_at: new Date('2024-01-01'),
                    updated_at: new Date('2024-01-02'),
                    summary: 'A brief summary of the community.',
                    icon: 'http://example.com/icon.png',
                    name: 'Example Community',
                    image: 'http://example.com/community-image.jpg',
                    colors: {
                        textAccent:"#green",
                        text:"#green",
                        accent:"#green",
                        primary:"#green",
                        secondary:"#green",
                        highlight:"#green",
                        muted:"#green",
                      cover: {
                        text: "#red",
                        accent: "#red",
                        primary: "#red",
                        background: "#red",
                      }
                    },
                    slug: 'example-community',
                    active: true,
                    description: 'A detailed description of the community.',
                    metadata: {
                        invite_id: 'invite123',
                        submissions: 5,
                        bestSubmissions: ['submission1', 'submission2'],
                        feedbacks: 10,
                        name: 'Example Certificate',
                        issuedOn: '2024-01-01',
                        image: 'http://example.com/certificate-image.jpg',
                        title: 'Certificate of Achievement',
                        description: 'A detailed description of the certificate.',
                        narrative: 'Narrative about the achievement.',
                        recipientName: 'John Doe',
                        issuerName: 'Example Organization',
                        comment: 'Congratulations on your achievement!',
                        linkToWork: 'http://example.com/work',
                        team: {
                          members: ['John Doe', 'Jane Doe'],
                          name: 'Team Example',
                        },
                    reward: {
                      id: 'reward123',
                      name: 'Special Reward',
                      description: 'A special reward for community members.',
                    },
                    courses: 5,
                    challenges: 10,
                    duration: 30, // Duration in days
                    items: ['item1', 'item2'], // Assuming items can be represented as strings
                    challenge: {
                      id: 'challenge1',
                      title: 'First Challenge',
                      description: 'Description of the first challenge.',
                    },
                    submission: {
                      id: 'submission1',
                      title: 'First Submission',
                      content: 'Content of the first submission.',
                    },
                    can_mint_certificates: true,
                  },    
                score: 75,
              },
            },
            discordConnected: true,
            isKycVerified: false,
            feedbacks: {
              score: 5,
              comment: 'Great service!',
            },
            discord: {
              connected: true,
            },
            kycStatus: KYCSTATUS.PENDING,
            referrals: [
              {
                referrerId: 'ref123',
                referredId: 'ref456',
                reward: 50,
              },
            ],
          },
        user_id: "45",
        }
    }
}