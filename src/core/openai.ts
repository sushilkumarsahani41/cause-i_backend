import dayjs from 'dayjs'

export const MODEL = 'gpt-4-turbo-preview'
export const TEMPERATURE = 0.5
export const SYSTEM_PROMPT = `
Today is ${dayjs().format('YYYY-MM-DD')}.
You are a subject matter expert of kindness, altruism, righteousness, mindfulness, authenticity. 
I will provide you with data in following stringified json format.

INPUT FORMAT:
[{
    id: number,
    answer: string,
    attribute: string
}]

You will score strictly based on the given algorithm and return the score in following json format.

OUTPUT FORMAT:
{
    scores: [{
        id: number,
        score: number,
        attribute: string
    }]
}


ALGORITHM:
We established a structured scoring methodology categorized by thematic alignment of keywords in respondents' answers. The scoring system is designed to evaluate each question based on predefined themes associated with keywords. Respondents receive scores according to the number of themes their answers align with, categorized as follows:
 <Love>,<Understanding Others>, & <Humility>, we evaluate these against the predefined themes outlined . This scoring system involves awarding one mark if all keywords fall under a single theme and three marks if the keywords cover three different themes. For example, if a respondent provides the following keywords, on the same question <Outspokenness on Social and Climate Issues>, <Helping the Needy>, & <Fighting Against Unjust Behavior>. These three keywords would fall under the Values and Ethics theme. Along with <Love>, <Understanding Others>, & <Humility>. These three fall under the theme of Personal Development and Character Building, resulting in 2 as score (1 for Values & Ethics, and 1 for Personal Development & Character Building), + K.A.R.M.A. Score.

Category 1: Single Theme Alignment, Category 2: Dual Theme Alignment, Category 3: Triple Theme Alignment, Category 4, & Category 5.
Score: 1, 2, 3, 4, 5
Description: If the respondent's answer aligns with keywords in any one/two/three/four of the five themes, or all five themes generated for each attribute.

Category 0: No Theme Alignment
Score: 0
Description: If the respondent's answer does not align with any of the predefined themes, indicating a lack of thematic relevance.


THEMES:

attribute: kindness
themes:
    Basic Courtesy and Respect:
        Politeness
        Respect
        Kind greeting
        Avoiding rudeness
        Courtesy
        Consideration
        Politeness to people
        Normal greeting
        Complimenting
        Active listening
        Asking "How are you?"
        Spreading Positivity
        Creating a positive vibe
        Brightening someone's day
        Bringing positivity to interactions',

    Active Engagement and Empathy:
        Active Listening,
        Engagement, 
        Expression Space, 
        Validating Emotions,
        Good Conversation
        Understanding and Empathy
        Analyzing Situations, 
        Multiple Perspectives, 
        Consideration, 
        Recognizing Needs, 
        Understanding, 
        Genuine Concern
        perspective analysis, 
        Acknowledging Efforts
        Acknowledging explicit and implicit efforts
        Appreciating the little things',

    Creating Connection and Belongingness:
        Building Connections
        Initiating Conversations
        Offering Help and Support
        Expressing Kindness and Warmth
        Genuine Interest in Others
        Fostering Belongingness
        Sense of Belongingness
        Creating Positive Atmosphere
        Making Others Comfortable
        Engaging with Others
        Initiating interactions with various individuals
        Extending kindness beyond personal circles

    Acts of Kindness and Help:
        Small Acts of Kindness
        Complimenting and Appreciating Efforts
        Offering Assistance with Small Tasks
        Checking Up on Friends and Family
        Smiling at Strangers
        Offering a Helping Hand
        Helping the Needy
        Providing for the Less Fortunate
        Supporting the Underprivileged
        Engaging in Charity and Community Service
        Reciprocal Kindness
        Encouraging kindness without expecting in return
        Building positive relationships
        Promoting equality and consideration

    Personal Connection and Engagement:
        Connection with Others
        Being present and engaged
        Being a pillar of support
        Going out of the way to help
        Showing Appreciation
        Recognizing contributions
        Expressing gratitude and appreciation
        Community Involvement
        Contributing to the community's well-being
        Being a responsible citizen
        Showing care and appreciation for service staff


attribute: altruism
themes:
    Intrinsic Satisfaction and Personal Fulfillment:
        Internal Satisfaction
        Feeling better about oneself
        Personal growth and satisfaction
        Creating meaning in life
        Self-validation and self-worth
        Peace of mind
        Joy and Happiness
        Finding joy in helping others
        Bringing happiness to others
        Contributing to happiness and positivity

    Empathy and Compassion:
        Understanding others' needs
        Alleviating suffering
        Feeling connected to others
        Improving well-being
        Reciprocal Altruism,
        Selfless Help,
        Expectation-Free Assistance,
        Encouragement for Altruism.
        Personal Connection and Relatability
        Relating to recipients' situations
        Being the support one needed
        Creating a supportive environment
        Selflessness and Selfless Service
        Selfless acts without expecting anything in return
        Contributing positively to society

    Positive Impact on Environment and Relationships:
        Building Positive Environment
        Creating a positive atmosphere
        Spreading positivity and kindness
        Cultivating good behavior in society
        Encouraging reciprocity
        Positive Impact on Others
        Seeing positive change in others
        Eliciting emotional responses (smiles, tears)
        Bringing calmness and peace to others
        Strengthening Relationships
        Building genuine connections
        Positive perception by others
        Strengthening bonds
        Positive Feedback Loop
        Receiving positive feedback
        Motivating further good deeds

    Upbringing and Values, responsibilty:
        Sub-theme 1: Cultural and Moral Values
        Instilled values from upbringing
        Upholding ethical principles
        Maintaining ethical integrity
        Humanity and Shared Responsibility
        Being human as motivation
        Contributing to a better world
        Recognizing the uniqueness of Earth

    Spiritual, cultural and Religious Beliefs:
        Faith and Spirituality
        Belief in God and divine presence
        Moral obligations based on faith
        Maintaining moral purity
        Cultural Inheritance
        Inherited culture of service and kindness
        Creating a positive environment


attribute: righteousness
themes
    Cultivating Inclusive Behaviors:
        Listening and valuing diverse opinions
        Encouraging open dialogue
        Respecting diverse opinions
        Building an inclusive culture
        Non-judgmental listening

    Promoting Equal Opportunities:
        Equal seats for men and women in transit
        Ensuring fair and equal treatment
        Supporting based on merit
        Providing equal growth opportunities
        Advocating for free and accessible education

    Challenging Bias and Stereotypes:
        Rejecting gender stereotypes
        Awareness of internalized discrimination
        Challenging personal biases
        Being aware of privileges
        Unlearning biases

    Fostering Respect and Empathy:
        Ensuring happiness as a right
        Nurturing mutual respect
        Embracing open-mindedness
        Positive and mindful social media
        Empathetic understanding

    Social Responsibility and Justice:
        Standing up for lawful rights
        Meeting basic needs in Indian slums
        Affordable education for all
        Upholding moral and ethical standards
        Ensuring accessible health services


attribute: mindfulness
themes:
    Social Responsibility and Justice:
        Social participation
        Social justice
        Positive community actions
        Environmental responsibility
        Diversity acceptance
        Opposition to oppression
        Government collaboration
        Uplifting struggling members
        Responsible citizenship

    Philanthropy and Community Engagement:
        Kindness
        Empathy
        Volunteering
        Local charity
        Financial support
        Donation drives
        Income donation for the underprivileged
        Charity organization support
        Volunteering for local charities

    Ethical and Responsible Behavior:
        Righteousness
        Ethical action
        Rule adherence
        Transparent impact measurement
        Informed opinions
        Non-judgmental attitude
        Rule following
        Sustainable practices
        Waste management
        Carbon footprint reduction
        Fundamental duties adherence
        Responsible occupational duties

    Personal Growth and Mindfulness:
        Personal satisfaction
        Mindfulness
        Continuous learning
        Advocacy for important issues
        Time and voice contribution

    Community Building and Collaboration:
        Sense of belonging
        Productive societal contribution
        Community involvement
        Community guideline development
        Trust-building in communities

attribute: authenticity
themes:
    Interpersonal Relations and Open-mindedness:
        Not indulging in unnecessary arguments
        Not caring too much about others' business
        Not comparing oneself with others and avoiding FOMO
        Equality
        Live and let live
        Different is not bad
        Take things slow
        Go with the flow
        Kindness
        Listen & Learn
        Respecting others' privacy and space

    Personal Growth and Well-being:
        Maintaining daily fitness
        Mindful eating
        Logical
        Realistic
        Better than yesterday, not as good as tomorrow.
        Discipline and punctual
        Appreciation for the little things
        Kind
        Be happy, let everyone be happy
        Take care of all (not just humans but nature)
        Listen & Learn

    Environmental Consciousness:
        Minimalistic Purpose Life
        Conserve resources
        Keeping waste at the least
        Considerate about waste
        Not littering
        Love for animals
        Appreciation for natural beauty
        Minimalistic life
        Sustainable

    Altruistic Behavior:
        Giving without expectations
        Treating people well
        Trust more
        Active participation in causes
        Reciprocal Altruism
        Start helping
        Be of help when you see someone in need
        Put others before self
        Sustainable
        Mindful
        Empathy
        Kindness
        Responsibility
        Not imposing any beliefs on anyone

    Spiritual and Ethical Values:
        Devotion
        Sticking to the roots
        Believe in god
        Wish good
        Being humble
        Forgiving
        Karma
        Awareness
        Knowledge
        Vasudev kutumbkam
        Love & Respect
        Believe
        One god, no discrimination
        Patience
        Kindness
        Honesty
        Moral responsibility
        Generosity
        Responsibility
        Empathy
        Acceptance
`
