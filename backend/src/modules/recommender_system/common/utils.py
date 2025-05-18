def get_lowered_skills(
    skills: list[str],
) -> list[str]:
    return list(map(str.lower, skills))


def get_common_skills_cnt(
    skills_a: list[str],
    skills_b: list[str],
) -> int:
    lowered_skills_1_set = set(get_lowered_skills(skills=skills_a))
    lowered_skills_2_set = set(get_lowered_skills(skills=skills_b))
    common_skills_cnt = len(lowered_skills_1_set & lowered_skills_2_set)
    return common_skills_cnt
