
Automapper is a library that makes it easier copy data from one object to another object od a different type. Instead of mapping each property in a class to the properties in another, you use the AutoMapper 'CreateMap'. This works best when the property names from each class are the same, but if the names of the properties are not the same, you can use the ForMember function to map data with different property names. I have experience this so far in using the AutoMapper to map data from a model to a view model, like StateYear (source) to StateYearView (destination) and vice versa. There is just one AutoMapper file in the EQR codebase, and you only need one per AppDomain.

The ForMember functionality is helpful not only for when property names (or types) do not match across classes but also when you want to transform the data in some way. For example, the HasPips property that you created on the PlanView class: the ForMember functionality was used to transform the data in a table related to Plan (PipTopicAssignmentPlan) into a boolean based on the count of pips associated with a given plan.

Adding CreateMap for properties that have the same name will result in an error (5/6/2020)

Some helpful information was found at:
AutoMapper documentation - http://docs.automapper.org/en/stable/index.html
.net Interview Prep videos - https://www.youtube.com/user/dnfvideo
Technotitps- Ashish - https://www.youtube.com/watch?v=oM-xoRJqNxc
Ignore in AutoMapper - https://dotnettutorials.net/lesson/ignore-using-automapper-in-csharp/


From PlanProfile (tho in the incorrect file...)
```
namespace EQR2.Helpers
{
    public class PlanProfile : Profile
    {
        public PlanProfile()
        {
            CreateMap<Plan, PlanView>()
                .ForMember(dest => dest.HasPips, opt => opt.MapFrom(x => x.PipTopicAssignmentPlans.Any()))
                .ForMember(dest => dest.PlanId, opt => opt.MapFrom(x => x.PipTopicAssignmentPlans.First()));
            CreateMap<PlanView, Plan>()
                .ForMember(dest => dest.PipTopicAssignmentPlans, opt => opt.MapFrom(x => new List<int> { x.PlanId }));
        }
    } // PlanView : PipTopicAssignmentPlan -> Plan: PipTopicAssignmentPlan[]
    //                 .ForMember(dest => dest.PipTopicAssignmentPlans, opt => opt.MapFrom(x => new List<int> { x.PlanId }));
    // .ForMember(dest => dest.PipTopicAssignmentPlans, opt => opt.MapFrom(x => x.PlanId));
}

```

***Remember:***

mapper goes from Input to Output, the first "type" is the one the the data is coming FROM, and the second "type" is the one we are translating the data to>
```
ICollection<PipListItemView> listItemViews = _mapper.Map<ICollection<PipTopicAssignment>, ICollection<PipListItemView>>(stateYear.PipTopicAssignments);
```

In the example above, listItemViews, which is of type ICollection of PipListItemViews is being assigned the value of the result of mapping ICollection of PipTopicAssignment to ICollection of PipListItemView using PipTopicAssignments from stateYear.